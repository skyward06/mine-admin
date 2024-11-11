import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  CREATE_SALE,
  UPDATE_SALE,
  REMOVE_SALE,
  FETCH_SALES_QUERY,
  FETCH_SALES_STATS_QUERY,
} from './query';

export function useFetchSales() {
  const [fetchSales, { loading, data, called }] = useLazyQuery(FETCH_SALES_QUERY);

  const rowCountRef = useRef(data?.sales.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.sales.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    sales: data?.sales.sales ?? [],
    fetchSales,
  };
}

export function useFetchSaleStats() {
  const [fetchSaleStats, { data }] = useLazyQuery(FETCH_SALES_STATS_QUERY);

  return { stats: data, fetchSaleStats };
}

export function useCreateSale() {
  const [createSale, { loading }] = useMutation(CREATE_SALE, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchSales'],
  });

  return { loading, createSale };
}

export function useUpdateSale() {
  const [updateSale, { loading }] = useMutation(UPDATE_SALE, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchSales'],
  });

  return { loading, updateSale };
}

export function useRemoveSale() {
  const [removeSale, { loading, error }] = useMutation(REMOVE_SALE, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchSales'],
  });

  return { loading, error, removeSale };
}
