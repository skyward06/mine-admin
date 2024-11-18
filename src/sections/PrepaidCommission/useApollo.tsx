import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { CREATE_PREPAID, UPDATE_PREPAID, FETCH_PREPAID_QUERY } from './query';

export function useFetchPrepaid() {
  const [fetchPrepaid, { loading, data }] = useLazyQuery(FETCH_PREPAID_QUERY);

  const rowCountRef = useRef(data?.prepaidCommissions.total ?? 0);

  const rowCount: any = useMemo(() => {
    const newTotal = data?.prepaidCommissions.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    prepaid: data?.prepaidCommissions.prepaidCommissions ?? [],
    fetchPrepaid,
  };
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
