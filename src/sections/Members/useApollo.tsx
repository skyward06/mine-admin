import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  UPDATE_MEMBER,
  APPROVE_MEMBER,
  FETCH_MEMBERS_QUERY,
  REMOVE_MEMBER_QUERY,
  UPDATE_PASSWORD_QUERY,
  REMOVE_MEMBER_PLACEMENT,
  FETCH_MEMBER_STATS_QUERY,
  RECALCULATE_CURRENT_COMMISSION,
} from './query';

export function useFetchMembers() {
  const [fetchMembers, { loading, data, called }] = useLazyQuery(FETCH_MEMBERS_QUERY);

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

export function useFetchMembersStats() {
  const [fetchMemberStats, { data }] = useLazyQuery(FETCH_MEMBER_STATS_QUERY);

  return { data, fetchMemberStats };
}

export function useUpdateMember() {
  const [updateMember, { loading }] = useMutation(UPDATE_MEMBER, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers'],
  });

  return { loading, updateMember };
}

export function useUpdatePassword() {
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD_QUERY, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers'],
  });

  return { loading, updatePassword };
}

export function useRemoveMember() {
  const [removeMember, { loading, error }] = useMutation(REMOVE_MEMBER_QUERY, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers'],
  });

  return { loading, error, removeMember };
}

export function useRemoveMemberPlacement() {
  const [removeMemberPlacement, { loading, error }] = useMutation(REMOVE_MEMBER_PLACEMENT, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers'],
  });

  return { loading, error, removeMemberPlacement };
}

export function useApproveMember() {
  const [approveMember, { loading, error }] = useMutation(APPROVE_MEMBER, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers'],
  });

  return { loading, error, approveMember };
}

export function useRecalculateCurrentCommission() {
  const [recalculateCurrentCommission, { loading, error }] = useMutation(
    RECALCULATE_CURRENT_COMMISSION,
    {}
  );

  return { loading, error, recalculateCurrentCommission };
}
