import { useRef, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FETCH_GROUP_SETTINGS } from './query';

export function useFetchGroupSettings() {
  const [fetchGroupSettings, { loading, data, called }] = useLazyQuery(FETCH_GROUP_SETTINGS);

  const rowCountRef = useRef(data?.groupSettings.total ?? 0);

  const rowCount: any = useMemo(() => {
    const newTotal = data?.groupSettings.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    groupSettings: data?.groupSettings.groupSettings ?? [],
    fetchGroupSettings,
  };
}
