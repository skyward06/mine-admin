import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  UPDATE_COMMISSION,
  CALCULATE_COMMISSION,
  UPDATE_COMMISSION_NOTE,
  FETCH_COMMISSION_QUERY,
  FETCH_COMMISSION_BY_WEEK,
  UPDATE_COMMISSION_STATUS,
  FETCH_COMMISSION_STATS_QUERY,
  CALCULATE_PREVIEW_COMMISSION,
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

export function useUpdateCommission() {
  const [updateCommission, { loading, data, error }] = useMutation(UPDATE_COMMISSION, {
    awaitRefetchQueries: true,
    refetchQueries: ['WeeklyCommissions', 'FetchCommissionStats'],
  });

  return { loading, data, error, updateCommission };
}

export function useUpdateCommissionStatus() {
  const [updateCommissionStatus, { loading, data, error }] = useMutation(UPDATE_COMMISSION_STATUS, {
    awaitRefetchQueries: true,
    refetchQueries: ['WeeklyCommissions', 'FetchCommissionStats'],
  });

  return { loading, data, error, updateCommissionStatus };
}

export function useCalculateCommission() {
  const [calculateCommission, { loading, data, error }] = useMutation(CALCULATE_COMMISSION);

  return { loading, data, error, calculateCommission };
}

export function useCalculatePreviewCommission() {
  const [calculatePreviewCommission, { loading, data, error }] = useMutation(
    CALCULATE_PREVIEW_COMMISSION
  );

  return { loading, data, error, calculatePreviewCommission };
}

export function useUpdateCommissionNote() {
  const [updateCommissionNote, { loading, data, error }] = useMutation(UPDATE_COMMISSION_NOTE, {
    awaitRefetchQueries: true,
    refetchQueries: ['WeeklyCommissions'],
  });

  return { loading, data, error, updateCommissionNote };
}
