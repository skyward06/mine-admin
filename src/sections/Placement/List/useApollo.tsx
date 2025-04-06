import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_SPONSOR_TEMP,
  FETCH_PLACEMENT_MEMBERS_WEEK,
  FETCH_PLACEMENT_MEMBERS_QUERY,
  FETCH_PLACEMENT_MEMBERS_O_QUERY,
  REMOVE_MEMBER_FROM_PLACEMENT_TREE,
} from './query';

export function useFetchSponsors() {
  const [fetchSponsors, { loading, data, called }] = useLazyQuery(FETCH_SPONSOR_TEMP);

  const rowCountRef = useRef(data?.members.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.members.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    members: data?.members.members ?? [],
    fetchSponsors,
  };
}

export function useFetchPlacementMembers() {
  const [fetchMembers, { loading, data, called }] = useLazyQuery(FETCH_PLACEMENT_MEMBERS_QUERY);

  const rowCountRef = useRef(data?.members.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.members.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    members: data?.members.members ?? [],
    fetchMembers,
  };
}

export function useFetchPlacementOMembers() {
  const [fetchPlacementMembers, { loading, data, called }] = useLazyQuery(
    FETCH_PLACEMENT_MEMBERS_O_QUERY
  );

  return {
    called,
    loading,
    members: data?.placementMembers ?? [],
    fetchPlacementMembers,
  };
}

export function useFetchPlacementForWeek() {
  const [fetchPlacementMembers, { loading, data, called }] = useLazyQuery(
    FETCH_PLACEMENT_MEMBERS_WEEK
  );

  return {
    loading,
    called,
    commissions: data?.placementMembersForWeek ?? [],
    fetchPlacementMembers,
  };
}

export function useRemoveMemberFromPlacementTree() {
  const [removeMember, { loading, data, error }] = useMutation(REMOVE_MEMBER_FROM_PLACEMENT_TREE, {
    awaitRefetchQueries: true,
    refetchQueries: ['PlacementMembers'],
  });

  return { loading, data, error, removeMember };
}
