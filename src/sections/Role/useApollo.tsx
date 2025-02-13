import { useRef, useMemo } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import { useParams, useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import {
  REMOVE_ROLE,
  CREATE_ROLE,
  UPDATE_ROLE,
  FETCH_ROLE_BY_ID,
  FETCH_ROLES_QUERY,
} from './query';

export function useFetchRoles() {
  const params = useParams();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(
    () => parseFilterModel({ id: params.id }, filter),
    [params, filter]
  );

  const { loading, data, called } = useQuery(FETCH_ROLES_QUERY, {
    variables: { filter: graphQueryFilter, page, sort },
  });

  const rowCountRef = useRef(data?.roles.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.roles.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    roles: data?.roles.roles ?? [],
  };
}

export function useFetchRoleById() {
  const [fetchRoleById, { loading, data, error }] = useLazyQuery(FETCH_ROLE_BY_ID);

  return { loading, role: data?.roleById, error, fetchRoleById };
}

export function useCreateRole() {
  const [createRole, { loading, data, error }] = useMutation(CREATE_ROLE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Roles'],
  });

  return { loading, data, error, createRole };
}

export function useUpdateRole() {
  const [updateRole, { loading, data, error }] = useMutation(UPDATE_ROLE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Roles'],
  });

  return { loading, data, error, updateRole };
}

export function useRemoveRole() {
  const [removeRole, { loading, data, error }] = useMutation(REMOVE_ROLE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Roles'],
  });

  return { loading, data, error, removeRole };
}
