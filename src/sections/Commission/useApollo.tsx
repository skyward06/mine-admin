import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_COMMISSION_QUERY,
  FETCH_COMMISSION_BY_WEEK,
  UPDATE_COMMISSION_STATUS,
  FETCH_COMMISSION_STATS_QUERY,
  CALCULATE_COMMISSION_PREVIEW,
} from './query';

export function useFetchCommissions() {
  const [fetchCommissions, { loading, data }] = useLazyQuery(FETCH_COMMISSION_QUERY);

  const rowCountRef = useRef(data?.weeklyCommissions.total ?? 0);

  const rowCount: any = useMemo(() => {
    const newTotal = data?.weeklyCommissions.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    weeklyCommissions: data?.weeklyCommissions.weeklyCommissions ?? [],
    fetchCommissions,
  };
}

export function useFetchCommissionStats() {
  const [fetchCommissionStats, { data }] = useLazyQuery(FETCH_COMMISSION_STATS_QUERY);

  return { data, fetchCommissionStats };
}

export function useFetchCommissionsByWeek() {
  const [fetchWeekCommissions, { loading, data }] = useLazyQuery(FETCH_COMMISSION_BY_WEEK);

  const rowCountRef = useRef(data?.commissionsByWeek.total ?? 0);

  const rowCount: any = useMemo(() => {
    const newTotal = data?.commissionsByWeek.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    weeklyCommissions: data?.commissionsByWeek.commissions ?? [],
    fetchWeekCommissions,
  };
}

export function useUpdateCommissionStatus() {
  const [updateCommissionStatus, { loading, data, error }] = useMutation(UPDATE_COMMISSION_STATUS, {
    awaitRefetchQueries: true,
    refetchQueries: ['WeeklyCommissions', 'FetchCommissionStats'],
  });

  return { loading, data, error, updateCommissionStatus };
}

export function useRecalculateCommissionPreview() {
  const [updateCommissionPreview, { loading, data, error }] = useMutation(
    CALCULATE_COMMISSION_PREVIEW,
    {
      awaitRefetchQueries: true,
      refetchQueries: ['WeeklyCommissions'],
    }
  );
  return { loading, data, error, updateCommissionPreview };
}
