import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_WEEKLY_REPORT,
  FETCH_REVENUES_QUERY,
  FETCH_SPONSORS_QUERY,
  GENERATE_WEEKLY_REPORT,
  GENERATE_WINNER_REPORT,
  FETCH_PEER_ACCEPTABLE_QUERY,
  FETCH_ONEPOINT_AWAY_MEMBERS_QUERY,
} from './query';

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

export function useFetchRevenues() {
  const [fetchRevenues, { loading, data, called }] = useLazyQuery(FETCH_REVENUES_QUERY);

  const rowCountRef = useRef(data?.memberInOutRevenues.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.memberInOutRevenues.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    revenues: data?.memberInOutRevenues.inOuts ?? [],
    fetchRevenues,
  };
}

export function useFetchWeeklyReports() {
  const [fetchWeeklyReports, { loading, data }] = useLazyQuery(FETCH_WEEKLY_REPORT, {
    variables: { sort: 'createdAt' },
  });

  const rowCountRef = useRef(data?.weeklyReports.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.weeklyReports.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    weeklyReports: data?.weeklyReports.weeklyReports ?? [],
    fetchWeeklyReports,
  };
}

export function useFetchSponsors() {
  const [fetchSponsors, { loading, data }] = useLazyQuery(FETCH_SPONSORS_QUERY);

  const rowCountRef = useRef(data?.weekIntroducers.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.weekIntroducers.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, rowCount, sponsors: data?.weekIntroducers.members ?? [], fetchSponsors };
}

export function useFetchPeerAcceptable() {
  const [fetchPeerAcceptable, { loading, data }] = useLazyQuery(FETCH_PEER_ACCEPTABLE_QUERY);

  const rowCountRef = useRef(data?.peerAcceptableMembers.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.peerAcceptableMembers.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    members: data?.peerAcceptableMembers.members ?? [],
    fetchPeerAcceptable,
  };
}

export function useGenerateWeeklyReports() {
  const [generateWeeklyReport, { loading, data }] = useMutation(GENERATE_WEEKLY_REPORT, {
    awaitRefetchQueries: true,
    refetchQueries: ['WeeklyReports'],
  });

  return { loading, data, generateWeeklyReport };
}

export function useGenerateWinnerReports() {
  const [generateWinnerReport, { loading, data, error }] = useMutation(GENERATE_WINNER_REPORT);

  return { loading, data, error, generateWinnerReport };
}
