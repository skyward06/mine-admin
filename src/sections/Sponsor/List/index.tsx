import _ from 'lodash';
import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  type Node,
  type Edge,
  useReactFlow,
  ReactFlowProvider,
  type FitViewOptions,
} from '@xyflow/react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  SPONSORTREE_NODE_HEIGHT,
  PLACEMENTTREE_NODE_WIDTH,
  PLACEMENTTREE_NODE_X_SPACE,
  PLACEMENTTREE_NODE_Y_SPACE,
} from 'src/consts';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import ComponentBlock from 'src/components/Component-Block';
import { LoadingScreen } from 'src/components/loading-screen';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useFetchPlacementMembers } from 'src/sections/Members/useApollo';
import IndividualMembers from 'src/sections/Placement/List/individualMembers';

import { StandardNode } from './node';
import CustomEdge from './customEdge';
import NodeContext from './nodeContext';
import SearchMiner from './searchMiner';

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
  duration: 1000,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

function buildPlacementTree(members: any[]) {
  const memberMap: Record<string, any> = {};
  const result: any = { id: 'root', children: [] };

  members.forEach((member) => {
    memberMap[member.id] = { ...member, children: [] };

    if (!member.sponsorId || member.sponsorId === member.id) {
      result.children.push(memberMap[member.id]);
    }
  });

  members.forEach((member) => {
    if (member.sponsorId && memberMap[member.sponsorId] && member.sponsorId !== member.id) {
      memberMap[member.sponsorId!].children.push(memberMap[member.id]);
    }
  });

  return { result, memberMap };
}

function buildTree(node: any, baseX: number, depth: number, tree: any[], visibleMap: any = null) {
  const { children } = node;

  if (children.length === 0) {
    const element = {
      id: node.id,
      data: { label: <StandardNode {...node} /> },
      position: {
        x: baseX,
        y: (depth - 1) * (SPONSORTREE_NODE_HEIGHT + PLACEMENTTREE_NODE_Y_SPACE),
      },
      draggable: true,
      style: {
        padding: 0,
        border: 'none',
        borderRadius: '12px',
        width: PLACEMENTTREE_NODE_WIDTH,
        height: SPONSORTREE_NODE_HEIGHT,
      },
      maxX: baseX + PLACEMENTTREE_NODE_WIDTH,
    };

    if (depth !== 0) {
      tree.push(element);
    }

    return element;
  }

  let maxX = baseX;
  const positions: any[] = [];

  if (!visibleMap || visibleMap[node.id] === 2) {
    children.forEach((child: any, idx: number) => {
      const { maxX: tempX, position } = buildTree(
        child,
        maxX + (idx === 0 ? 0 : PLACEMENTTREE_NODE_X_SPACE),
        depth + 1,
        tree,
        visibleMap
      );
      maxX = tempX;
      positions.push(position);
    });
  }

  let resPositionX = maxX;
  if (!visibleMap || visibleMap[node.id] === 2) {
    resPositionX = (maxX + baseX - PLACEMENTTREE_NODE_WIDTH) / 2;
  } else {
    resPositionX = baseX;
    maxX = resPositionX + PLACEMENTTREE_NODE_WIDTH;
  }
  const res = {
    id: node.id,
    data: { label: <StandardNode {...node} /> },
    position: {
      x: resPositionX,
      y: (depth - 1) * (SPONSORTREE_NODE_HEIGHT + PLACEMENTTREE_NODE_Y_SPACE),
    },
    draggable: true,
    style: {
      padding: 0,
      border: 'none',
      borderRadius: '12px',
      width: PLACEMENTTREE_NODE_WIDTH,
      height: SPONSORTREE_NODE_HEIGHT,
    },
    maxX,
  };

  if (depth !== 0) {
    tree.push(res);
  }

  return res;
}

function getMemberIdsWithDepth(node: any, depth: number, targetDepth: number) {
  if (depth === targetDepth) {
    if (node.children.length) return [{ id: node.id, value: 1 }];
    return [{ id: node.id, value: 3 }];
  }
  const res: any[] = [];
  node.children.forEach((child: any) => {
    res.push(...getMemberIdsWithDepth(child, depth + 1, targetDepth));
  });

  return res.length === 0 ? [{ id: node.id, value: 3 }] : [...res, { id: node.id, value: 2 }];
}

function getResetVisibleMap(members: undefined | null | any[]): Record<string, number> {
  if (!members || members.length === 0) {
    return {};
  }

  const { result: placementTree } = buildPlacementTree(members);
  const maps = getMemberIdsWithDepth(placementTree, 0, 3);
  const newVisibleMap: Record<string, number> = {};

  maps.forEach((mp: any) => {
    newVisibleMap[mp.id] = mp.value;
  });

  return newVisibleMap;
}

function getNewVisibleMap(
  members: undefined | null | any[],
  visibleMap: Record<string, number>
): Record<string, number> {
  if (!members || !members.length) return {};

  const { memberMap } = buildPlacementTree(members);
  const newVisibleMap: Record<string, number> = {};
  Object.entries(visibleMap).forEach(([id]) => {
    if (id === 'root') {
      newVisibleMap[id] = 2;
      return;
    }

    if (memberMap[id]) {
      if (memberMap[id].children.length === 0) {
        newVisibleMap[id] = 3;
      } else {
        let value = 1;
        memberMap[id].children.forEach((child: any) => {
          if (visibleMap[child.id]) {
            value = 2;
          }
        });
        newVisibleMap[id] = visibleMap[id] === 3 ? value : visibleMap[id];
      }
    }
  });

  return newVisibleMap;
}

function PlacementListView() {
  const popover = usePopover();
  const open = useBoolean();

  const { fetchMembers, members, loading, called } = useFetchPlacementMembers();

  const [visibleMap, setVisibleMap] = useState<Record<string, number>>({});
  const exSetVisibleMap = useCallback((newVisibleMap: Record<string, number>) => {
    setVisibleMap(newVisibleMap);
    localStorage.setItem('sponsorVisibleMap', JSON.stringify(newVisibleMap));
  }, []);

  useEffect(() => {
    fetchMembers({ variables: { filter: { status: true } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nodes: Node[] = useMemo(() => {
    if (!members || members.length === 0) return [];
    const { result: placementTree } = buildPlacementTree(members);

    const resultTree: any[] = [];

    buildTree(placementTree, 0, 0, resultTree, visibleMap);

    return resultTree;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, visibleMap]);

  const edges: Edge[] = useMemo(
    () =>
      members
        .filter((member) => member?.sponsorId)
        .map((member) => ({
          id: `${member?.sponsorId}:${member?.id}`,
          source: member?.sponsorId ?? '',
          target: member?.id ?? '',
          type: 'customEdge',
        })),
    [members]
  );

  const expandTree = useCallback(
    async (id: string) => {
      const newVisibleMap: Record<string, number> = { ...visibleMap };

      members
        .filter((mb) => mb?.sponsorId === id)
        .forEach((mb) => {
          if (!newVisibleMap[mb?.id ?? '']) {
            newVisibleMap[mb?.id ?? ''] =
              members.findIndex((mber) => mber?.sponsorId === mb?.id) === -1 ? 3 : 1;
          }
        });

      newVisibleMap[id] = members.findIndex((mb) => mb?.sponsorId === id) === -1 ? 3 : 2;

      exSetVisibleMap(newVisibleMap);
    },
    [members, visibleMap, exSetVisibleMap]
  );

  const collapseTree = useCallback(
    async (id: string) => {
      const newVisibleMap: Record<string, number> = { ...visibleMap };

      newVisibleMap[id] = members.findIndex((mb) => mb?.sponsorId === id) === -1 ? 3 : 1;

      exSetVisibleMap(newVisibleMap);
    },
    [members, visibleMap, exSetVisibleMap]
  );

  const contextValue = useMemo(
    () => ({
      visibleMap,
      expandTree,
      collapseTree,
    }),
    [visibleMap, expandTree, collapseTree]
  );

  const { fitView } = useReactFlow();

  const resetVisibleMap = useCallback(() => {
    const newVisibleMap = getResetVisibleMap(members);
    exSetVisibleMap(newVisibleMap);

    setTimeout(() => {
      fitView({
        ...fitViewOptions,
        nodes: Object.keys(newVisibleMap).map((id) => ({ id })),
      });
    }, 100);
  }, [members, fitView, exSetVisibleMap]);

  const reSyncVisibleMap = useCallback(() => {
    const storageVisibleMap = localStorage.getItem('sponsorVisibleMap');
    const newVisibleMap = storageVisibleMap
      ? getNewVisibleMap(members, JSON.parse(storageVisibleMap))
      : {};
    exSetVisibleMap(newVisibleMap);
    setTimeout(() => {
      fitView({
        ...fitViewOptions,
        nodes: Object.keys(newVisibleMap).map((id) => ({ id })),
      });
    }, 100);
  }, [members, exSetVisibleMap, fitView]);

  const onMinerChange = useCallback(
    (minerId: string) => {
      const newVisibleMap = { ...visibleMap };
      let iMinerId: string | null | undefined = minerId;

      while (iMinerId) {
        const currentMinerId: string = iMinerId;
        const newIMinerId = members.find((mb) => mb?.id === currentMinerId)?.sponsorId;

        if (newIMinerId === iMinerId) break;

        iMinerId = newIMinerId;

        if (iMinerId) {
          newVisibleMap[iMinerId] = 2;
          members
            .filter((mb) => mb?.sponsorId === newIMinerId)
            .forEach((mb) => {
              if (!newVisibleMap[mb?.id ?? '']) {
                newVisibleMap[mb?.id ?? ''] =
                  members.findIndex((mber) => mber?.sponsorId === mb?.id) === -1 ? 3 : 1;
              }
            });
        }
      }

      if (iMinerId) {
        exSetVisibleMap(newVisibleMap);
      }

      setTimeout(() => {
        fitView({
          ...fitViewOptions,
          nodes: [
            {
              id: minerId,
            },
          ],
        });
      }, 100);
    },
    [members, visibleMap, fitView, exSetVisibleMap]
  );

  useEffect(() => {
    if (!called || loading) return;
    const storageVisibleMap = localStorage.getItem('sponsorVisibleMap');

    if (!storageVisibleMap || _.isEmpty(JSON.parse(storageVisibleMap))) resetVisibleMap();
    else reSyncVisibleMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, loading]);

  const reset = useCallback(async () => {
    const { data } = await fetchMembers();
    const newVisibleMap = getResetVisibleMap(data?.members.members);

    exSetVisibleMap(newVisibleMap);

    setTimeout(() => {
      fitView({
        ...fitViewOptions,
        nodes: Object.keys(newVisibleMap).map((id) => ({ id })),
      });
    }, 100);
  }, [fetchMembers, exSetVisibleMap, fitView]);

  const refresh = useCallback(async () => {
    const { data } = await fetchMembers();
    const storageVisibleMap = localStorage.getItem('sponsorVisibleMap');
    const newVisibleMap = storageVisibleMap
      ? getNewVisibleMap(data?.members.members, JSON.parse(storageVisibleMap))
      : {};
    exSetVisibleMap(newVisibleMap);

    setTimeout(() => {
      fitView({
        ...fitViewOptions,
        nodes: Object.keys(newVisibleMap).map((id) => ({ id })),
      });
    }, 100);
  }, [fetchMembers, exSetVisibleMap, fitView]);

  return (
    <DashboardContent sx={{ overflowX: 'hidden' }}>
      <Breadcrumbs
        heading="Sponsor"
        links={[{ name: 'Sponsor', href: paths.dashboard.sponsor.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Box
            display="grid"
            columnGap={1}
            sx={{ gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '85% 15%' } }}
          >
            <SearchMiner onMinerChange={onMinerChange} />
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Box>
        }
      />

      {loading ? (
        <LoadingScreen />
      ) : (
        <ComponentBlock sx={{ px: 0, pb: 0 }}>
          <Stack sx={{ overflow: 'auto', height: '600px', width: '100%' }}>
            <NodeContext.Provider value={contextValue}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                fitViewOptions={fitViewOptions}
                edgeTypes={edgeTypes}
              />
            </NodeContext.Provider>
          </Stack>
        </ComponentBlock>
      )}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              reset();
              popover.onClose();
            }}
          >
            Reset
          </MenuItem>
          <MenuItem
            onClick={() => {
              refresh();
              popover.onClose();
            }}
          >
            Refresh
          </MenuItem>
          <MenuItem
            onClick={() => {
              open.onTrue();
              popover.onClose();
            }}
          >
            Individual Members
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <Drawer
        open={open.value}
        anchor="right"
        onClose={open.onFalse}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: { xs: 1, sm: 700 }, p: 2 } }}
      >
        <IndividualMembers />
      </Drawer>
    </DashboardContent>
  );
}

export default function PlacementListViewWithReactFlowProvider() {
  return (
    <ReactFlowProvider>
      <PlacementListView />
    </ReactFlowProvider>
  );
}
