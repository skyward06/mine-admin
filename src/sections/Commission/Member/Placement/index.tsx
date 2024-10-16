import dayjs from 'dayjs';
import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  type Node,
  type Edge,
  useReactFlow,
  ReactFlowProvider,
  type FitViewOptions,
} from '@xyflow/react';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/useBoolean';

import {
  ROOT_ID,
  COMMISSION_NODE_HEIGHT,
  PLACEMENTTREE_NODE_WIDTH,
  PLACEMENTTREE_NODE_X_SPACE,
  PLACEMENTTREE_NODE_Y_SPACE,
} from 'src/consts';

import ComponentBlock from 'src/components/Component-Block';
import { LoadingScreen } from 'src/components/loading-screen';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import CustomEdge from 'src/sections/Placement/List/customEdge';
import { useFetchMembers } from 'src/sections/Members/useApollo';
import NodeContext from 'src/sections/Placement/List/nodeContext';

import { StandardNode } from './node';
import SearchMiner from './searchMiner';
import { useFetchCommissions } from '../../useApollo';

interface Props {
  memberId: string | undefined;
  weekStartDate: string;
}

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
  duration: 1000,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

function buildPlacementTree(members: any[]) {
  const memberMap: Record<string, any> = {};
  const memberProcess: any[] = [];
  let result: any = {};

  members.forEach((member) => {
    memberMap[member.id] = { ...member, children: [] };

    if (member.placementParentId) {
      memberProcess.push(member);
    }

    if (member.id === member.placementParentId) {
      result = memberMap[member.id];
    }
  });

  if (Object.keys(result).length === 0) {
    const rootMember = memberProcess.find((mbp) => mbp.placementParentId === ROOT_ID);
    result = memberMap[rootMember.id];
  }

  memberProcess.forEach((member) => {
    if (
      member.placementParentId &&
      memberMap[member.placementParentId] &&
      member.id !== member.placementParentId
    ) {
      memberMap[member.placementParentId!].children.push(memberMap[member.id]);
    }
  });

  return result;
}

function buildTree(
  node: any,
  baseX: number,
  depth: number,
  tree: any[],
  commissions: any,
  visibleMap: any = null
) {
  const children = node.children.sort(
    (child1: any, child2: any) =>
      child1.placementPosition === 'LEFT' || child2.placementPosition === 'RIGHT'
  );

  if (children.length === 0) {
    const element = {
      id: node.id,
      data: { label: <StandardNode commissions={commissions} {...node} /> },
      position: { x: baseX, y: depth * (COMMISSION_NODE_HEIGHT + PLACEMENTTREE_NODE_Y_SPACE) },
      draggable: true,
      style: {
        padding: 0,
        border: 'none',
        borderRadius: '12px',
        width: PLACEMENTTREE_NODE_WIDTH,
        height: COMMISSION_NODE_HEIGHT,
      },
      maxX: baseX + PLACEMENTTREE_NODE_WIDTH,
    };

    tree.push(element);

    return element;
  }

  let maxX = baseX;

  if (!visibleMap || visibleMap[node.id] === 2) {
    children
      .filter((child: any) => child.placementPosition === 'LEFT')
      .forEach((child: any, idx: number) => {
        const { maxX: tempX } = buildTree(
          child,
          maxX + (idx === 0 ? 0 : PLACEMENTTREE_NODE_X_SPACE),
          depth + 1,
          tree,
          commissions,
          visibleMap
        );
        maxX = tempX;
      });
  }

  const res = {
    id: node.id,
    data: { label: <StandardNode commissions={commissions} {...node} /> },
    position: {
      x: Math.max(baseX, maxX - (PLACEMENTTREE_NODE_WIDTH - PLACEMENTTREE_NODE_X_SPACE) / 2),
      y: depth * (COMMISSION_NODE_HEIGHT + PLACEMENTTREE_NODE_Y_SPACE),
    },
    draggable: true,
    style: {
      padding: 0,
      border: 'none',
      borderRadius: '12px',
      width: PLACEMENTTREE_NODE_WIDTH,
      height: COMMISSION_NODE_HEIGHT,
    },
  };

  maxX = res.position.x + (PLACEMENTTREE_NODE_WIDTH - PLACEMENTTREE_NODE_X_SPACE) / 2;

  if (!visibleMap || visibleMap[node.id] === 2) {
    children
      .filter((child: any) => child.placementPosition === 'RIGHT')
      .forEach((child: any) => {
        const { maxX: tempX } = buildTree(
          child,
          maxX + PLACEMENTTREE_NODE_X_SPACE,
          depth + 1,
          tree,
          commissions,
          visibleMap
        );
        maxX = tempX;
      });
  }

  const element = {
    ...res,
    maxX: Math.max(maxX, res.position.x + PLACEMENTTREE_NODE_WIDTH),
  };

  tree.push(element);

  return element;
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

function PlacementListView({ memberId, weekStartDate }: Props) {
  const popover = usePopover();
  const open = useBoolean();

  const { fetchMembers, members, loading } = useFetchMembers();
  const { fetchCommissions, weeklyCommissions } = useFetchCommissions();

  const [visibleMap, setVisibleMap] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchMembers({
      variables: { sort: '-placementPosition' },
    });

    fetchCommissions({
      variables: {
        filter: {
          weekStartDate,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nodes: Node[] = useMemo(() => {
    if (!members || members.length === 0) return [];
    const placementTree = buildPlacementTree(members.filter((member) => member?.placementParentId));

    const resultTree: any[] = [];

    buildTree(placementTree, 0, 0, resultTree, weeklyCommissions, visibleMap);

    return resultTree;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, visibleMap]);

  const edges: Edge[] = useMemo(
    () =>
      members
        .filter((member) => member?.placementParentId)
        .map((member) => ({
          id: `${member?.placementParentId}:${member?.id}`,
          source: member?.placementParentId ?? '',
          target: member?.id ?? '',
          type: 'customEdge',
        })),
    [members]
  );

  const expandTree = useCallback(
    (id: string) => {
      const newVisibleMap: Record<string, number> = { ...visibleMap };

      members
        .filter((mb) => mb?.placementParentId === id)
        .forEach((mb) => {
          if (!newVisibleMap[mb?.id ?? '']) {
            newVisibleMap[mb?.id ?? ''] =
              members.findIndex((mber) => mber?.placementParentId === mb?.id) === -1 ? 3 : 1;
          }
        });

      newVisibleMap[id] = members.findIndex((mb) => mb?.placementParentId === id) === -1 ? 3 : 2;

      setVisibleMap(newVisibleMap);
    },
    [members, visibleMap]
  );

  const collapseTree = useCallback(
    (id: string) => {
      const newVisibleMap: Record<string, number> = { ...visibleMap };

      newVisibleMap[id] = members.findIndex((mb) => mb?.placementParentId === id) === -1 ? 3 : 1;

      setVisibleMap(newVisibleMap);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleMap]
  );

  const contextValue = useMemo(
    () => ({
      visibleMap,
      expandTree,
      collapseTree,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleMap]
  );

  const { fitView } = useReactFlow();

  const getNewVisibleMapMinerSearch = useCallback(
    (_visibleMap: Record<string, number>, _iMinerId: string | null | undefined) => {
      const newVisibleMap = { ..._visibleMap };
      let iMinerId: string | null | undefined = _iMinerId;

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
        return { change: true, map: newVisibleMap };
      }
      return { change: false, map: _visibleMap };
    },
    [members]
  );

  const onMinerChange = useCallback(
    (minerId: string) => {
      const { change, map } = getNewVisibleMapMinerSearch(visibleMap, minerId);
      if (change) {
        setVisibleMap(map);
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
    [visibleMap, fitView, getNewVisibleMapMinerSearch]
  );

  const resetVisibleMap = useCallback(() => {
    if (!members || members.length === 0) {
      setVisibleMap({});

      return;
    }

    const placementTree = buildPlacementTree(members.filter((member) => member?.placementParentId));
    const maps = getMemberIdsWithDepth(placementTree, 0, 3);
    const newVisibleMap: Record<string, number> = {};

    maps.forEach((mp: any) => {
      newVisibleMap[mp.id] = mp.value;
    });

    setVisibleMap(newVisibleMap);

    if (memberId) {
      const { map } = getNewVisibleMapMinerSearch(newVisibleMap, memberId);
      setVisibleMap(map);

      setTimeout(() => {
        fitView({
          ...fitViewOptions,
          nodes: [
            {
              id: memberId,
            },
          ],
        });
      }, 100);
    } else {
      setTimeout(() => {
        fitView({
          ...fitViewOptions,
          nodes: maps.map((mp) => ({ id: mp.id })),
        });
      }, 100);
    }
  }, [members, fitView, memberId, getNewVisibleMapMinerSearch]);

  const reset = () => {};

  const refresh = () => {};

  useEffect(() => {
    if (!loading) {
      resetVisibleMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Paper sx={{ overflowX: 'hidden', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ pb: 2 }}>
        <Typography variant="subtitle1" sx={{ pt: 1 }}>
          Placement (Week #{dayjs(weekStartDate).add(1, 'day').format('ww')})
        </Typography>
        <SearchMiner onMinerChange={onMinerChange} weekStartDate={weekStartDate} />
      </Stack>

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
          <MenuItem onClick={reset}>Reset</MenuItem>
          <MenuItem onClick={refresh}>Refresh</MenuItem>
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
    </Paper>
  );
}

export default function PlacementListViewWithReactFlowProvider({ memberId, weekStartDate }: Props) {
  return (
    <ReactFlowProvider>
      <PlacementListView memberId={memberId} weekStartDate={weekStartDate} />
    </ReactFlowProvider>
  );
}
