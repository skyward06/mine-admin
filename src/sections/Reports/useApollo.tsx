import { useRef, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FETCH_ONEPOINT_AWAY_MEMBERS_QUERY } from './query';

export function useFetchOnepointAwayMembers() {
  const [fetchMembers, { loading, data, called }] = useLazyQuery(FETCH_ONEPOINT_AWAY_MEMBERS_QUERY);

  const rowCountRef = useRef(data?.onepointAwayMembers.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.onepointAwayMembers.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    members: data?.onepointAwayMembers.members ?? [],
    fetchMembers,
  };
}
