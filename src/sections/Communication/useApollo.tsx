import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_MEMBERS,
  CREATE_MEMBER_LIST,
  UPDATE_EMAIL_TEMPLATE,
  FETCH_EMAIL_TEMPLATES,
  FETCH_MEMBER_LIST_QUERY,
  FETCH_MEMBER_LIST_BY_ID,
  FETCH_EMAIL_TEMPLATE_BY_ID,
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

export function useFetchTemplates() {
  const [fetchTemplates, { loading, data }] = useLazyQuery(FETCH_EMAIL_TEMPLATES);

  const rowCountRef = useRef(data?.emailTemplates.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.emailTemplates.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, templates: data?.emailTemplates.templates, rowCount, fetchTemplates };
}

export function useFetchTemplateById() {
  const [fetchTemplateById, { loading, data, error }] = useLazyQuery(FETCH_EMAIL_TEMPLATE_BY_ID);

  return { loading, template: data?.emailTemplateById, error, fetchTemplateById };
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

export function useUpdateTemplate() {
  const [updateEmailTemplate, { loading, data, error }] = useMutation(UPDATE_EMAIL_TEMPLATE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Memberlists', 'EmailTemplates'],
  });

  return { loading, data, error, updateEmailTemplate };
}
