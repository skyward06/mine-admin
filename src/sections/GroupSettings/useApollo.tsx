import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_GROUP_SETTINGS,
  CREATE_GROUP_SETTINGS,
  UPDATE_GROUP_SETTINGS,
  REMOVE_GROUP_SETTINGS,
} from './query';

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

export function useCreateGroupSettings() {
  const [createGroupSettings, { loading, data, error }] = useMutation(CREATE_GROUP_SETTINGS, {
    awaitRefetchQueries: true,
    refetchQueries: ['GroupSettings'],
  });

  return { loading, data, error, createGroupSettings };
}

export function useUpdateGroupSettings() {
  const [updateGroupSettings, { loading, data, error }] = useMutation(UPDATE_GROUP_SETTINGS, {
    awaitRefetchQueries: true,
    refetchQueries: ['GroupSettings'],
  });

  return { loading, data, error, updateGroupSettings };
}

export function useRemoveGroupSettings() {
  const [removeGroupSettings, { loading, data, error }] = useMutation(REMOVE_GROUP_SETTINGS, {
    awaitRefetchQueries: true,
    refetchQueries: ['GroupSettings'],
  });

  return { loading, data, error, removeGroupSettings };
}
