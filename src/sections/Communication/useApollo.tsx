import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_MEMBERS,
  CREATE_MEMBER_LIST,
  FETCH_MEMBER_LIST_QUERY,
  FETCH_MEMBER_LIST_BY_ID,
} from './query';

export function useFetchMemberList() {
  const [fetchMemberList, { loading, data }] = useLazyQuery(FETCH_MEMBER_LIST_QUERY);

  const rowCountRef = useRef(data?.memberlists.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.memberlists.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, memberList: data?.memberlists.memberLists, rowCount, fetchMemberList };
}

export function useFetchMemberListById() {
  const [fetchMemberListById, { loading, data, error }] = useLazyQuery(FETCH_MEMBER_LIST_BY_ID);

  return { loading, memberList: data?.memberListById, error, fetchMemberListById };
}

export function useFetchMembers() {
  const [fetchMembers, { loading, data }] = useLazyQuery(FETCH_MEMBERS);

  return { loading, members: data?.members.members ?? [], fetchMembers };
}

export function useCreateMemberList() {
  const [createMemberList, { loading, data, error }] = useMutation(CREATE_MEMBER_LIST, {
    awaitRefetchQueries: true,
    refetchQueries: ['Memberlists'],
  });

  return { loading, data, error, createMemberList };
}
