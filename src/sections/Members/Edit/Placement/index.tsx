import type { Member, PlacementMember } from 'src/__generated__/graphql';

import { isEmpty } from 'lodash';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { ReactFlow, type Node, type Edge, type FitViewOptions } from '@xyflow/react';

import Stack from '@mui/material/Stack';

import { PlacementPosition } from 'src/__generated__/graphql';
import {
  PLACEMENTTREE_NODE_WIDTH,
  PLACEMENTTREE_NODE_HEIGHT,
  PLACEMENTTREE_NODE_X_SPACE,
  PLACEMENTTREE_NODE_Y_SPACE,
} from 'src/consts';

import { EmptyContent } from 'src/components/EmptyContent';
import ComponentBlock from 'src/components/Component-Block';
import { LoadingScreen } from 'src/components/loading-screen';

import CustomEdge from './customEdge';
import { StandardNode } from './node';
import NodeContext from './nodeContext';
import { useFetchPlacementOMembers } from '../../useApollo';

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

interface Props {
  currentMember: Member;
}

const nodeTypes = {
  treeNode: StandardNode,
};

export default function PlacementListView({ currentMember }: Props) {
  const [visibleMap, setVisibleMap] = useState<Record<string, number>>({});
  const { loading, members, fetchPlacementMembers } = useFetchPlacementOMembers();

  const exSetVisibleMap = useCallback((newVisibleMap: Record<string, number>) => {
    setVisibleMap(newVisibleMap);
    localStorage.setItem('placementVisibleMap', JSON.stringify(newVisibleMap));
  }, []);

  useEffect(() => {
    fetchPlacementMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMember]);

  type PlacementTreeNode = PlacementMember & { children: PlacementTreeNode[] };

  function buildPlacementTree(miners: any[]) {
    const memberMap: Record<string, any> = {};
    let result: any = {};

    miners.forEach((member) => {
      memberMap[member.id] = { ...member, children: [] };

      if (member.id === currentMember.id) {
        result = memberMap[member.id];
      }
    });

    miners.forEach((member) => {
      if (member.id !== member.placementParentId) {
        memberMap[member.placementParentId!].children.push(memberMap[member.id]);
      }
    });

    return { result, memberMap };
  }

  function buildTree(root: PlacementTreeNode, vMap: Record<string, number> | null = null) {
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

      if (!vMap || vMap[node.id] === 2) {
        if (leftChild && rightChild) {
          const childStartX = baseX - (PLACEMENTTREE_NODE_WIDTH + PLACEMENTTREE_NODE_X_SPACE) / 2;
          const { endX: leftEndX } = func(leftChild, childStartX, depth + 1, tree);
          const { endX: rightEndX } = func(rightChild, leftEndX, depth + 1, tree);
          positionX =
            (leftEndX + rightEndX - 2 * (PLACEMENTTREE_NODE_X_SPACE + PLACEMENTTREE_NODE_WIDTH)) /
            2;
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

  const contextValue = useMemo(
    () => ({
      visibleMap,
      expandTree,
      collapseTree,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleMap]
  );

  const resetVisibleMap = useCallback(() => {
    if (!members || members.length === 0) {
      setVisibleMap({});

      localStorage.setItem('placementVisibleMap', JSON.stringify({}));

      return;
    }

    const placementTree = buildPlacementTree(members.filter((member) => member?.placementParentId));
    const maps = getMemberIdsWithDepth(placementTree, 0, 3);
    const newVisibleMap: Record<string, number> = {};

    maps.forEach((mp: any) => {
      newVisibleMap[mp.id] = mp.value;
    });

    setVisibleMap(newVisibleMap);

    localStorage.setItem('placementVisibleMap', JSON.stringify(newVisibleMap));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  useEffect(() => {
    const storageVisibleMap = localStorage.getItem('placementVisibleMap');

    if (!storageVisibleMap || isEmpty(JSON.parse(storageVisibleMap))) resetVisibleMap();
    else setVisibleMap(JSON.parse(storageVisibleMap));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {nodes.length ? (
            <ComponentBlock sx={{ px: 0, pb: 0 }}>
              <Stack sx={{ overflow: 'auto', height: '550px', width: '100%' }}>
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
          ) : (
            <EmptyContent />
          )}
        </>
      )}
    </>
  );
}
