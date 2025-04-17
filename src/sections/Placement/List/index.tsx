import type { PlacementMember } from 'src/__generated__/graphql';

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
import { useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';
import { PlacementPosition } from 'src/__generated__/graphql';
import {
  PLACEMENTTREE_NODE_WIDTH,
  PLACEMENTTREE_NODE_HEIGHT,
  PLACEMENTTREE_NODE_X_SPACE,
  PLACEMENTTREE_NODE_Y_SPACE,
} from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import ComponentBlock from 'src/components/Component-Block';
import { LoadingScreen } from 'src/components/loading-screen';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useCalculatePreviewCommission } from 'src/sections/Commission/useApollo';

import CustomEdge from './customEdge';
import { StandardNode } from './node';
import NodeContext from './nodeContext';
import SearchMiner from './searchMiner';
import IndividualMembers from './individualMembers';
import { useFetchPlacementOMembers } from './useApollo';

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
  duration: 1000,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const nodeTypes = {
  treeNode: StandardNode,
};

type PlacementTreeNode = PlacementMember & { children: PlacementTreeNode[] };

function buildPlacementTree(members: any[]) {
  const memberMap: Record<string, any> = {};
  let result: any = {};

  members.forEach((member) => {
    memberMap[member.id] = { ...member, children: [] };

    if (member.id === member.placementParentId) {
      result = memberMap[member.id];
    }
  });

  members.forEach((member) => {
    if (member.id !== member.placementParentId) {
      memberMap[member.placementParentId!].children.push(memberMap[member.id]);
    }
  });

  return { result, memberMap };
}

function getSubtree(node: any) {
  const res: any[] = [];
  node.children?.forEach((child: any) => {
    const subtree = getSubtree(child);
    res.push(...subtree);
  });
  return [...res, node];
}

function buildTree(root: PlacementTreeNode, visibleMap: Record<string, number> | null = null) {
  const resultNodes: Node[] = [];
  const depthHeights: number[] = [];

  function func(node: PlacementTreeNode, startX: number, depth: number, tree: Node[]) {
    const leftChild = node.children.filter(
      (child) => child.placementPosition === PlacementPosition.Left
    )[0];
    const rightChild = node.children.filter(
      (child) => child.placementPosition === PlacementPosition.Right
    )[0];
    const baseX = Math.max(depthHeights[depth] ?? 0, startX);
    let positionX = baseX;
    const positionY = depth * (PLACEMENTTREE_NODE_HEIGHT + PLACEMENTTREE_NODE_Y_SPACE);

    if (!visibleMap || visibleMap[node.id] === 2) {
      if (leftChild && rightChild) {
        const childStartX = baseX - (PLACEMENTTREE_NODE_WIDTH + PLACEMENTTREE_NODE_X_SPACE) / 2;
        const { endX: leftEndX } = func(leftChild, childStartX, depth + 1, tree);
        const { endX: rightEndX } = func(rightChild, leftEndX, depth + 1, tree);
        positionX =
          (leftEndX + rightEndX - 2 * (PLACEMENTTREE_NODE_X_SPACE + PLACEMENTTREE_NODE_WIDTH)) / 2;
      } else if (leftChild) {
        const childStartX = baseX - (PLACEMENTTREE_NODE_WIDTH + PLACEMENTTREE_NODE_X_SPACE) / 2;
        const { endX: leftEndX } = func(leftChild, childStartX, depth + 1, tree);
        positionX = leftEndX - (PLACEMENTTREE_NODE_X_SPACE + PLACEMENTTREE_NODE_WIDTH) / 2;
      } else if (rightChild) {
        const childStartX = baseX + (PLACEMENTTREE_NODE_WIDTH + PLACEMENTTREE_NODE_X_SPACE) / 2;
        const { endX: rightEndX } = func(rightChild, childStartX, depth + 1, tree);
        positionX = rightEndX - ((PLACEMENTTREE_NODE_X_SPACE + PLACEMENTTREE_NODE_WIDTH) * 3) / 2;
      }
    }
    const element: Node = {
      id: node.id,
      position: { x: positionX, y: positionY },
      data: node,
      style: {
        width: PLACEMENTTREE_NODE_WIDTH,
        height: PLACEMENTTREE_NODE_HEIGHT,
      },
      type: 'treeNode',
    };

    tree.push(element);

    const endX = positionX + PLACEMENTTREE_NODE_WIDTH + PLACEMENTTREE_NODE_X_SPACE;
    depthHeights[depth] = endX;

    return { element, endX };
  }

  func(root, 0, 0, resultNodes);
  return resultNodes;
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

  const { result: placementTree } = buildPlacementTree(
    members.filter((member) => member?.placementParentId)
  );
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

  const { memberMap } = buildPlacementTree(members.filter((member) => member?.placementParentId));
  const newVisibleMap: Record<string, number> = {};
  Object.entries(visibleMap).forEach(([id]) => {
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

  const searchParams = useSearchParams();
  const memberId = searchParams.get('memberId');

  const { fetchPlacementMembers, members, loading, called } = useFetchPlacementOMembers();
  const { loading: calculationLoading, calculatePreviewCommission } =
    useCalculatePreviewCommission();

  const [visibleMap, setVisibleMap] = useState<Record<string, number>>({});
  const exSetVisibleMap = useCallback((newVisibleMap: Record<string, number>) => {
    setVisibleMap(newVisibleMap);
    localStorage.setItem('placementVisibleMap', JSON.stringify(newVisibleMap));
  }, []);

  useEffect(() => {
    fetchPlacementMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  const nodes: Node[] = useMemo(() => {
    if (members.length === 0) return [];
    const { result: placementTree } = buildPlacementTree(members);
    if (!placementTree) return [];

    return buildTree(placementTree, visibleMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, visibleMap]);

  const edges: Edge[] = useMemo(
    () =>
      members
        .filter((member) => member.placementParentId !== member.id)
        .map((member) => ({
          id: `${member.placementParentId}:${member.id}`,
          source: member.placementParentId,
          target: member.id,
          type: 'default',
        })),
    [members]
  );
  const expandTree = useCallback(
    async (id: string) => {
      const newVisibleMap: Record<string, number> = { ...visibleMap };

      members
        .filter((member) => member.placementParentId === id)
        .forEach((member) => {
          if (!newVisibleMap[member.id]) {
            newVisibleMap[member.id] =
              members.findIndex((mbr) => mbr.placementParentId === member.id) === -1 ? 3 : 1;
          }
        });

      newVisibleMap[id] =
        members.findIndex((member) => member.placementParentId === id) === -1 ? 3 : 2;

      exSetVisibleMap(newVisibleMap);
    },
    [members, visibleMap, exSetVisibleMap]
  );

  const collapseTree = useCallback(
    async (id: string) => {
      const newVisibleMap: Record<string, number> = { ...visibleMap };

      newVisibleMap[id] =
        members.findIndex((member) => member.placementParentId === id) === -1 ? 3 : 1;

      exSetVisibleMap(newVisibleMap);
    },
    [members, visibleMap, exSetVisibleMap]
  );

  const { fitView } = useReactFlow();

  const expandAll = useCallback(
    async (id: string) => {
      const { memberMap } = buildPlacementTree(members);
      const subtreeMembers = getSubtree(memberMap[id]);
      const newVisibleMap = { ...visibleMap };
      subtreeMembers.forEach((mb) => {
        newVisibleMap[mb.id] = mb.children.length ? 2 : 3;
      });
      exSetVisibleMap(newVisibleMap);
      setTimeout(() => {
        fitView({
          ...fitViewOptions,
          nodes: subtreeMembers.map(({ id: rootID }: { id: string }) => ({ id: rootID })),
        });
      });
    },
    [members, visibleMap, exSetVisibleMap, fitView]
  );

  const collapseAll = useCallback(
    async (id: string) => {
      const { memberMap } = buildPlacementTree(members);
      const subtreeMembers = getSubtree(memberMap[id]);
      const newVisibleMap = { ...visibleMap };
      subtreeMembers.forEach((mb) => {
        delete newVisibleMap[mb.id];
      });
      newVisibleMap[id] = memberMap[id].children.length ? 1 : 3;

      exSetVisibleMap(newVisibleMap);
      setTimeout(() => {
        fitView({
          ...fitViewOptions,
          nodes: [{ id }],
        });
      });
    },
    [members, visibleMap, exSetVisibleMap, fitView]
  );

  const contextValue = useMemo(
    () => ({
      visibleMap,
      expandTree,
      collapseTree,
      expandAll,
      collapseAll,
    }),
    [visibleMap, expandTree, collapseTree, expandAll, collapseAll]
  );

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
    const storageVisibleMap = localStorage.getItem('placementVisibleMap');
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
        const newIMinerId = members.find((mb) => mb?.id === currentMinerId)?.placementParentId;

        if (newIMinerId === iMinerId) break;

        iMinerId = newIMinerId;

        if (iMinerId) {
          newVisibleMap[iMinerId] = 2;
          members
            .filter((mb) => mb?.placementParentId === newIMinerId)
            .forEach((mb) => {
              if (!newVisibleMap[mb?.id ?? '']) {
                newVisibleMap[mb?.id ?? ''] =
                  members.findIndex((mber) => mber?.placementParentId === mb?.id) === -1 ? 3 : 1;
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
    const storageVisibleMap = localStorage.getItem('placementVisibleMap');

    if (!storageVisibleMap || _.isEmpty(JSON.parse(storageVisibleMap))) resetVisibleMap();
    else reSyncVisibleMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, loading]);

  useEffect(() => {
    if (memberId) {
      onMinerChange(memberId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, memberId]);

  const reset = useCallback(async () => {
    const { data } = await fetchPlacementMembers();
    const newVisibleMap = getResetVisibleMap(data?.placementMembers);

    exSetVisibleMap(newVisibleMap);

    setTimeout(() => {
      fitView({
        ...fitViewOptions,
        nodes: Object.keys(newVisibleMap).map((id) => ({ id })),
      });
    }, 100);
  }, [fetchPlacementMembers, exSetVisibleMap, fitView]);

  const refresh = useCallback(async () => {
    const { data } = await fetchPlacementMembers();
    const storageVisibleMap = localStorage.getItem('placementVisibleMap');
    const newVisibleMap = storageVisibleMap
      ? getNewVisibleMap(data?.placementMembers, JSON.parse(storageVisibleMap))
      : {};
    exSetVisibleMap(newVisibleMap);

    setTimeout(() => {
      fitView({
        ...fitViewOptions,
        nodes: Object.keys(newVisibleMap).map((id) => ({ id })),
      });
    }, 100);
  }, [fetchPlacementMembers, exSetVisibleMap, fitView]);

  const handleCalculateCommission = useCallback(async () => {
    try {
      const { data } = await calculatePreviewCommission();

      if (data) {
        toast.success('Successfully calculated!');
        popover.onClose();
      }
    } catch (err) {
      toast.error(err.message);
    }
  }, [popover, calculatePreviewCommission]);

  return (
    <DashboardContent sx={{ overflowX: 'hidden' }}>
      <Breadcrumbs
        heading="Placement"
        links={[{ name: 'Placement', href: paths.dashboard.placement.root }, { name: 'List' }]}
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
          <Stack sx={{ overflow: 'auto', height: 'calc(100vh - 280px)', width: '100%' }}>
            <NodeContext.Provider value={contextValue}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                fitViewOptions={fitViewOptions}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
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
              handleCalculateCommission();
            }}
          >
            Calculate {calculationLoading && <Iconify icon="line-md:loading-loop" />}
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
        PaperProps={{ sx: { width: { xs: 375, sm: 700 }, p: 2 } }}
      >
        <IndividualMembers open={open} onMinerChange={onMinerChange} />
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
