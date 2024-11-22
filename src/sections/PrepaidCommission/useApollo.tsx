import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  CREATE_PREPAID,
  UPDATE_PREPAID,
  REMOVE_PREPAID,
  FETCH_PREPAID_QUERY,
  FETCH_COMMISSION_BY_MEMBER,
} from './query';

export function useFetchPrepaid() {
  const [fetchPrepaid, { loading, data, called }] = useLazyQuery(FETCH_PREPAID_QUERY);

  const rowCountRef = useRef(data?.prepaidCommissions.total ?? 0);

  const rowCount: any = useMemo(() => {
    const newTotal = data?.prepaidCommissions.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    prepaid: data?.prepaidCommissions.prepaidCommissions ?? [],
    fetchPrepaid,
  };
}

export function useFetchCommissionByMemberAndWeek() {
  const [fetchCommissions, { loading, data, called }] = useLazyQuery(FETCH_COMMISSION_BY_MEMBER);

  return { called, loading, commission: data?.commissionByMemberIDAndWeek, fetchCommissions };
}

export function useCreatePrepaid() {
  const [createPrepaid, { loading }] = useMutation(CREATE_PREPAID, {
    awaitRefetchQueries: true,
    refetchQueries: ['PrepaidCommissions'],
  });

  return { loading, createPrepaid };
}

export function useUpdatePrepaid() {
  const [updatePrepaid, { loading }] = useMutation(UPDATE_PREPAID, {
    awaitRefetchQueries: true,
    refetchQueries: ['PrepaidCommissions'],
  });

  return { loading, updatePrepaid };
}

export function useRemovePrepaid() {
  const [removePrepaid, { loading, error }] = useMutation(REMOVE_PREPAID, {
    awaitRefetchQueries: true,
    refetchQueries: ['PrepaidCommissions'],
  });

  return { loading, error, removePrepaid };
}
