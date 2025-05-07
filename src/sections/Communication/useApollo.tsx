import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  FETCH_MEMBERS,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  REMOVE_SCHEDULE,
  CREATE_MEMBER_LIST,
  REMOVE_MEMBER_LIST,
  FETCH_CAMPAIGN_QUERY,
  FETCH_CAMPAIGN_BY_ID,
  FETCH_SCHEDULE_QUERY,
  FETCH_WEEKLY_MEMBERS,
  CREATE_SEND_CAMPAIGN,
  CREATE_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE,
  FETCH_EMAIL_TEMPLATES,
  FETCH_MEMBER_LIST_QUERY,
  FETCH_MEMBER_LIST_BY_ID,
  FETCH_EMAIL_TEMPLATE_BY_ID,
} from './query';

export function useFetchWeeklyMembers() {
  const [fetchWeeklyMembers, { loading, data }] = useLazyQuery(FETCH_WEEKLY_MEMBERS);

  const rowCountRef = useRef(data?.weeklyCommissions.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.weeklyCommissions.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    weeklyMembers: data?.weeklyCommissions.weeklyCommissions,
    fetchWeeklyMembers,
  };
}

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

  return { loading, memberList: data?.memberlists.memberLists ?? [], rowCount, fetchMemberList };
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

export function useFetchCampaigns() {
  const [fetchCampaigns, { loading, data }] = useLazyQuery(FETCH_CAMPAIGN_QUERY);

  const rowCountRef = useRef(data?.campaigns.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.campaigns.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, campaigns: data?.campaigns.campaigns ?? [], rowCount, fetchCampaigns };
}

export function useFetchCampaignById() {
  const [fetchCampaign, { loading, data }] = useLazyQuery(FETCH_CAMPAIGN_BY_ID);

  return { loading, campaign: data?.campaignById, fetchCampaign };
}

export function useCreateCampaign() {
  const [createCampaign, { loading, data, error }] = useMutation(CREATE_SEND_CAMPAIGN, {
    awaitRefetchQueries: true,
    refetchQueries: ['Campaigns'],
  });

  return { loading, data, error, createCampaign };
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

export function useRemoveMemberList() {
  const [removeMemberList, { loading, data, error }] = useMutation(REMOVE_MEMBER_LIST, {
    awaitRefetchQueries: true,
    refetchQueries: ['Memberlists'],
  });

  return { loading, data, error, removeMemberList };
}

export function useCreateTemplate() {
  const [createEmailTemplate, { loading, data, error }] = useMutation(CREATE_EMAIL_TEMPLATE);

  return { loading, data, error, createEmailTemplate };
}

export function useUpdateTemplate() {
  const [updateEmailTemplate, { loading, data, error }] = useMutation(UPDATE_EMAIL_TEMPLATE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Memberlists', 'EmailTemplates'],
  });

  return { loading, data, error, updateEmailTemplate };
}

export function useFetchSchedule() {
  const [fetchSchedule, { loading, data }] = useLazyQuery(FETCH_SCHEDULE_QUERY);

  const rowCountRef = useRef(data?.scheduleCampaigns.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.scheduleCampaigns.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, schedule: data?.scheduleCampaigns.scheduleCampaigns, rowCount, fetchSchedule };
}

export function useCreateSchedule() {
  const [createSchedule, { loading, data, error }] = useMutation(CREATE_SCHEDULE, {
    awaitRefetchQueries: true,
    refetchQueries: ['ScheduleCampaigns'],
  });

  return { loading, data, error, createSchedule };
}

export function useUpdateSchdule() {
  const [updateSchedule, { loading, data, error }] = useMutation(UPDATE_SCHEDULE, {
    awaitRefetchQueries: true,
    refetchQueries: ['ScheduleCampaigns'],
  });

  return { loading, data, error, updateSchedule };
}

export function useRemoveSchedule() {
  const [removeSchedule, { loading, data, error }] = useMutation(REMOVE_SCHEDULE, {
    awaitRefetchQueries: true,
    refetchQueries: ['ScheduleCampaigns'],
  });

  return { loading, data, error, removeSchedule };
}
