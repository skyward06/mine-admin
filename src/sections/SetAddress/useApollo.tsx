import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { SET_COLLECT_ADDRESS, FETCH_COLLECT_ADDRESS } from './query';

export function useFetchCollectAddress() {
  const [fetchCollectAddress, { loading, data }] = useLazyQuery(FETCH_COLLECT_ADDRESS);

  const rowCountRef = useRef(data?.collectAddresses.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.collectAddresses.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    addresses: data?.collectAddresses.collectAddresses ?? [],
    fetchCollectAddress,
  };
}

export function useSetCollectAddress() {
  const [setCollectAddress, { loading, data, error }] = useMutation(SET_COLLECT_ADDRESS);

  return { loading, data, error, setCollectAddress };
}
