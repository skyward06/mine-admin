import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  MOVE_TO_PAID,
  UPDATE_MEMBER,
  APPROVE_MEMBER,
  MOVE_TO_BLOCKED,
  MOVE_TO_PENDING,
  DUPLICATE_MEMBER,
  MOVE_TO_GRAVEYARD,
  RESET_BONUS_CLOCK,
  SEND_WELCOME_EMAIL,
  FETCH_MEMBERS_QUERY,
  VERIFY_MEMBER_EMAIL,
  REMOVE_MEMBER_QUERY,
  UPDATE_PASSWORD_QUERY,
  REMOVE_MEMBER_PLACEMENT,
  FETCH_MEMBER_STATS_QUERY,
  FETCH_MEMBER_SEARCH_QUERY,
  FETCH_INDIVIDUAL_MEMBERS_QUERY,
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

export function useFetchMemberSearch() {
  const [fetchMemberSearch, { loading, data, error }] = useLazyQuery(FETCH_MEMBER_SEARCH_QUERY);

  return { loading, members: data?.members.members ?? [], error, fetchMemberSearch };
}

export function useFetchIndividualMembers() {
  const [fetchIndividualMembers, { loading, data, error }] = useLazyQuery(
    FETCH_INDIVIDUAL_MEMBERS_QUERY
  );

  return {
    loading,
    members: data?.individualMembers ?? [],
    error,
    fetchIndividualMembers,
  };
}

export function useFetchMembersStats() {
  const [fetchMemberStats, { data }] = useLazyQuery(FETCH_MEMBER_STATS_QUERY);

  return { data, fetchMemberStats };
}

export function useUpdateMember() {
  const [updateMember, { loading }] = useMutation(UPDATE_MEMBER, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchPlacementMembers', 'PlacementMembers'],
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
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
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
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, error, approveMember };
}

export function useSendWelcomeEmail() {
  const [sendWelcomeEmail, { loading, data, error }] = useMutation(SEND_WELCOME_EMAIL);

  return { loading, data, error, sendWelcomeEmail };
}

export function useMoveToGraveyard() {
  const [moveToGraveyard, { loading, data, error }] = useMutation(MOVE_TO_GRAVEYARD, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, data, error, moveToGraveyard };
}

export function useMoveToPaid() {
  const [moveToPaid, { loading, data, error }] = useMutation(MOVE_TO_PAID, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, data, error, moveToPaid };
}

export function useMoveToPending() {
  const [moveToPending, { loading, data, error }] = useMutation(MOVE_TO_PENDING, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, data, error, moveToPending };
}

export function useVerifyMemberEmail() {
  const [verifyMemberEmail, { loading, data, error }] = useMutation(VERIFY_MEMBER_EMAIL, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, data, error, verifyMemberEmail };
}

export function useDuplicateMember() {
  const [duplicateMember, { loading, data, error }] = useMutation(DUPLICATE_MEMBER, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, data, error, duplicateMember };
}

export function useResetBonusClock() {
  const [resetBonusClock, { loading, data, error }] = useMutation(RESET_BONUS_CLOCK, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, data, error, resetBonusClock };
}

export function useMoveToBlocked() {
  const [moveToBlocked, { loading, data, error }] = useMutation(MOVE_TO_BLOCKED, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMembers', 'FetchMemberStats'],
  });

  return { loading, data, error, moveToBlocked };
}
