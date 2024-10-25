import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  CREATE_PACKAGE,
  UPDATE_PACKAGE,
  REMOVE_PACKAGE,
  FETCH_PACKAGES_QUERY,
  FETCH_PACKAGES_STATS_QUERY,
} from './query';

export function useFetchPackages() {
  const [fetchPackages, { loading, data }] = useLazyQuery(FETCH_PACKAGES_QUERY);

  const rowCountRef = useRef(data?.packages.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.packages.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    packages: data?.packages.packages ?? [],
    fetchPackages,
  };
}

export function useFetchPackageStats() {
  const [fetchPackageStats, { data }] = useLazyQuery(FETCH_PACKAGES_STATS_QUERY);

  return { data, fetchPackageStats };
}

export function useCreatePackage() {
  const [createPackage, { loading }] = useMutation(CREATE_PACKAGE, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchPackages'],
  });

  return { loading, createPackage };
}

export function useUpdatePackage() {
  const [updatePackage, { loading }] = useMutation(UPDATE_PACKAGE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Packages'],
  });

  return { loading, updatePackage };
}

export function useRemovePackage() {
  const [removePackage, { loading, error }] = useMutation(REMOVE_PACKAGE, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchPackages'],
  });

  return { loading, error, removePackage };
}
