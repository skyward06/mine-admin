import { useRef, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import { CREATE_BALANCE, FETCH_BALANCES } from './query';

export function useFetchBalances() {
  const [{ page = '1,50', sort = 'date,createdAt', filter }] = useQueryString();

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

export function useCreateBalance() {
  const [createBalance, { loading, data, error }] = useMutation(CREATE_BALANCE);

  return { loading, data, error, createBalance };
}
