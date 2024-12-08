import { useRef, useMemo } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import {
  CREATE_SALE,
  UPDATE_SALE,
  REMOVE_SALE,
  FETCH_SALES_QUERY,
  FETCH_SALES_STATS_QUERY,
} from './query';

export function useFetchSales() {
  const [{ page = '1,25', sort = 'ID', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, data, called } = useQuery(FETCH_SALES_QUERY, {
    variables: { filter: graphQueryFilter, page, sort },
  });

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
  };
}

export function useFetchSale(ID: number) {
  const { loading, data } = useQuery(FETCH_SALES_QUERY, {
    variables: { filter: { ID } },
  });

  return { loading, sale: data?.sales.sales ?? [] };
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
