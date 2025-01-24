import { useRef, useMemo } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import { CALCULATE_COMMISSION_PREVIEW } from '../Commission/query';
import {
  UPDATE_MEMBER,
  APPROVE_MEMBER,
  FETCH_BALANCES,
  MOVE_TO_GRAVEYARD,
  SEND_WELCOME_EMAIL,
  FETCH_MEMBERS_QUERY,
  REMOVE_MEMBER_QUERY,
  UPDATE_PASSWORD_QUERY,
  REMOVE_MEMBER_PLACEMENT,
  FETCH_MEMBER_STATS_QUERY,
  FETCH_PLACEMENT_MEMBERS_QUERY,
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

export function useFetchMembersStats() {
  const [fetchMemberStats, { data }] = useLazyQuery(FETCH_MEMBER_STATS_QUERY);

  return { data, fetchMemberStats };
}

export function useUpdateMember() {
  const [updateMember, { loading }] = useMutation(UPDATE_MEMBER, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchPlacementMembers'],
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

export function useRecalculateCurrentCommission() {
  const [recalculateCurrentCommission, { loading, error }] = useMutation(
    CALCULATE_COMMISSION_PREVIEW
  );

  return { loading, error, recalculateCurrentCommission };
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

export function useFetchBalances() {
  const [{ page = '1,50', sort = 'date', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, data, called } = useQuery(FETCH_BALANCES, {
    variables: { filter: graphQueryFilter, page, sort },
  });

  const rowCountRef = useRef(data?.balances.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.balances.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    balances: data?.balances.balances ?? [],
  };
}
