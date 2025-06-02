import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  LINK_MEMBERS,
  FETCH_SHARE_ACCOUNTS,
  CREATE_SHARE_ACCOUNT,
  UPDATE_SHARE_ACCOUNT,
  FETCH_SHARE_ACCOUNT_BY_ID,
} from './query';

export function useFetchShareAccounts() {
  const [fetchShareAccounts, { loading, data }] = useLazyQuery(FETCH_SHARE_ACCOUNTS);

  const rowCountRef = useRef(data?.shareAccounts.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.shareAccounts.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    shareAccounts: data?.shareAccounts.shareAccounts ?? [],
    fetchShareAccounts,
  };
}

export function useFetchShareAccount() {
  const [fetchShareAccount, { loading, data }] = useLazyQuery(FETCH_SHARE_ACCOUNT_BY_ID);

  return { loading, shareAccount: data?.shareAccountById, fetchShareAccount };
}

export function useCreateShareAccount() {
  const [createShareAccount, { loading, data, error }] = useMutation(CREATE_SHARE_ACCOUNT);

  return { loading, data, error, createShareAccount };
}

export function useUpdateShareAccount() {
  const [updateShareAccount, { loading, data, error }] = useMutation(UPDATE_SHARE_ACCOUNT);

  return { loading, data, error, updateShareAccount };
}

export function useLinkMembers() {
  const [linkMembers, { loading, data, error }] = useMutation(LINK_MEMBERS, {
    awaitRefetchQueries: true,
    refetchQueries: ['ShareAccounts'],
  });

  return { loading, data, error, linkMembers };
}
