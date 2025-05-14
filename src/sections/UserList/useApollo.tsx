import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  CREATE_ADMIN,
  UPDATE_ADMIN,
  REMOVE_ADMIN,
  FETCH_USERS_QUERY,
  FETCH_USER_STATS_QUERY,
  UPDATE_PASSWORD_BY_ADMIN,
} from './query';

export function useFetchAdmins() {
  const [fetchAdmins, { loading, data, called }] = useLazyQuery(FETCH_USERS_QUERY);

  const rowCountRef = useRef(data?.admins.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.admins.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    admins: data?.admins.admins ?? [],
    fetchAdmins,
  };
}

export function useFetchAdminStats() {
  const [fetchAdminStats, { data }] = useLazyQuery(FETCH_USER_STATS_QUERY);

  return { data, fetchAdminStats };
}

export function useCreateAdmin() {
  const [createAdmin, { loading, data, error }] = useMutation(CREATE_ADMIN);

  return { loading, data, error, createAdmin };
}

export function useUpdateAdmin() {
  const [updateAdmin, { loading, data, error }] = useMutation(UPDATE_ADMIN, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchUsers'],
  });

  return { loading, data, error, updateAdmin };
}

export function useUpdatePasswordByAdmin() {
  const [updatePasswordByAdmin, { loading, data, error }] = useMutation(UPDATE_PASSWORD_BY_ADMIN);

  return { loading, data, error, updatePasswordByAdmin };
}

export function useRemoveAdmin() {
  const [removeAdmin, { loading, data, error }] = useMutation(REMOVE_ADMIN, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchUsers'],
  });

  return { loading, data, error, removeAdmin };
}
