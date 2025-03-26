import type { Member } from 'src/sections/Members/List/type';
import type { BasicListMember } from 'src/__generated__/graphql';
import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { customizeFullName } from 'src/utils/helper';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';

import { useFetchMembers } from 'src/sections/Members/useApollo';

import { useFetchWeeklyMembers, useFetchMemberListById } from '../useApollo';

import type { WeeklyMember } from './type';

interface Props {
  filter: any;
  listId: string;
  weekly: boolean;
}

export default function MemberListView({ filter: categoryFilter, listId, weekly }: Props) {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () => parseFilterModel({ ...categoryFilter, status: true }, filter),
    [filter, categoryFilter]
  );

  const { loading, rowCount, members, fetchMembers } = useFetchMembers();
  const {
    loading: weeklyLoading,
    weeklyMembers,
    rowCount: pendingCount,
    fetchWeeklyMembers,
  } = useFetchWeeklyMembers();
  const { loading: listLoading, memberList, fetchMemberListById } = useFetchMemberListById();

  const pendingMembers = useMemo(
    () =>
      weeklyMembers?.map((item) => ({
        id: item.member?.id!,
        email: item.member?.email!,
        username: item.member?.username!,
        fullName: item.member?.fullName!,
      })),
    [weeklyMembers]
  );

  useEffect(() => {
    if (weekly) {
      fetchWeeklyMembers({ variables: { filter: categoryFilter, page, sort } });
    } else if (listId) {
      fetchMemberListById({ variables: { data: { id: listId } } });
    } else {
      fetchMembers({ variables: { filter: graphQueryFilter, page, sort } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort, listId]);

  const colDefs = useMemo<ColDef<Member | BasicListMember | WeeklyMember>[]>(
    () => [
      {
        field: 'username',
        headerName: 'Username',
        width: 300,
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'fullName',
        headerName: 'Full Name',
        width: 300,
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({
          data,
        }: CustomCellRendererProps<Member | BasicListMember | WeeklyMember>) =>
          customizeFullName(data?.fullName ?? ''),
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
    ],
    []
  );

  return (
    <AgGrid<Member | BasicListMember | WeeklyMember>
      gridKey="communication-members-list"
      loading={weekly ? weeklyLoading : listId ? listLoading : loading}
      rowData={weekly ? pendingMembers : listId ? memberList?.members ?? [] : members}
      columnDefs={colDefs}
      totalRowCount={weekly ? pendingCount : listId ? memberList?.members.length ?? 0 : rowCount}
    />
  );
}
