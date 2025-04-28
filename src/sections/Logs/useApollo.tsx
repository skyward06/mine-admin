import { useRef, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FETCH_LOG_QUERY } from './query';

export function useFetchLogs() {
  const [fetchLogs, { loading, data }] = useLazyQuery(FETCH_LOG_QUERY);

  const rowCountRef = useRef(data?.logs.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.logs.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, rowCount, logs: data?.logs.logs ?? [], fetchLogs };
}
