import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { MOVE_TO_WIP, MOVE_TO_SOLVE, FETCH_BUG_REPORT, FETCH_BUG_REPORTS } from './query';

export function useFetchBugReports() {
  const [fetchBugReports, { loading, data }] = useLazyQuery(FETCH_BUG_REPORTS);

  const rowCountRef = useRef(data?.bugReports.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.bugReports.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    bugReports: data?.bugReports.bugReports ?? [],
    fetchBugReports,
  };
}

export function useFetchBugReport() {
  const [fetchBugReport, { loading, data, error }] = useLazyQuery(FETCH_BUG_REPORT);

  return { loading, bugReport: data?.bugReportById, error, fetchBugReport };
}

export function useMoveToSolve() {
  const [moveToSolve, { loading, data, error }] = useMutation(MOVE_TO_SOLVE, {
    awaitRefetchQueries: true,
    refetchQueries: ['BugReports'],
  });

  return { loading, data, error, moveToSolve };
}

export function useMoveToWip() {
  const [moveToWip, { loading, data, error }] = useMutation(MOVE_TO_WIP, {
    awaitRefetchQueries: true,
    refetchQueries: ['BugReports'],
  });

  return { loading, data, error, moveToWip };
}
