import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { CREATE_PROMO, REMOVE_PROMO, UDPATE_PROMO, FETCH_PROMOS_QUERY } from './query';

export function useFetchPromos() {
  const [fetchPromos, { loading, data, called }] = useLazyQuery(FETCH_PROMOS_QUERY);

  const rowCountRef = useRef(data?.promos.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.promos.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    promos: data?.promos.promos ?? [],
    fetchPromos,
  };
}

export function useCreatePromo() {
  const [createPromo, { loading, data, error }] = useMutation(CREATE_PROMO, {
    awaitRefetchQueries: true,
    refetchQueries: ['Promos'],
  });

  return { loading, data, error, createPromo };
}

export function useUpdatePromo() {
  const [updatePromo, { loading, data, error }] = useMutation(UDPATE_PROMO, {
    awaitRefetchQueries: true,
    refetchQueries: ['Promos'],
  });

  return { loading, data, error, updatePromo };
}

export function useRemovePromo() {
  const [removePromo, { loading, data, error }] = useMutation(REMOVE_PROMO, {
    awaitRefetchQueries: true,
    refetchQueries: ['Promos'],
  });

  return { loading, data, error, removePromo };
}
