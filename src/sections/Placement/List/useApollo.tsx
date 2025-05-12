import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_SPONSOR_TEMP,
  FETCH_PLACEMENT_MEMBERS_WEEK,
  FETCH_PLACEMENT_MEMBERS_O_QUERY,
  REMOVE_MEMBER_FROM_PLACEMENT_TREE,
} from './query';

export function useFetchSponsors() {
  const [fetchSponsors, { loading, data, called }] = useLazyQuery(FETCH_SPONSOR_TEMP);

  return { called, loading, members: data?.sponsorMembers ?? [], fetchSponsors };
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
