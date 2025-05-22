import type { BasicListMember } from 'src/__generated__/graphql';
import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';
import type { WeeklyMember } from 'src/sections/Communication/List/type';

import { useMemo, useEffect } from 'react';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { customizeFullName } from 'src/utils/helper';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';

import { useFetchSponsors } from 'src/sections/Reports/useApollo';
import { useFetchMemberSearch } from 'src/sections/Members/useApollo';

import { useFetchMemberListById } from '../../../useApollo';

import type { MemberSearch } from './type';

interface Props {
  filter: any;
  listId: string;
  weekly: boolean;
  sponsor: boolean;
  setEmails: Function;
}

export default function MemberListView({
  filter: categoryFilter,
  listId,
  weekly,
  sponsor,
  setEmails,
}: Props) {
  const [{ filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () => parseFilterModel({ ...categoryFilter, status: true }, filter),
    [filter, categoryFilter]
  );

  const { loading, members, fetchMemberSearch } = useFetchMemberSearch();
  const { loading: listLoading, memberList, fetchMemberListById } = useFetchMemberListById();
  const { loading: sponsorLoading, sponsors, fetchSponsors } = useFetchSponsors();

  useEffect(() => {
    if (sponsor) {
      fetchSponsors({ variables: { week: categoryFilter.week } });
    } else if (listId) {
      fetchMemberListById({ variables: { data: { id: listId } } });
    } else if (!weekly) {
      fetchMemberSearch({ variables: { filter: graphQueryFilter } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, listId, categoryFilter]);

  useEffect(() => {
    if (sponsor) {
      setEmails(sponsors?.map((item) => item.email));
    } else if (weekly) {
      setEmails([]);
    } else if (listId) {
      setEmails(memberList?.members?.map((item) => item.email));
    } else {
      setEmails(members.map((item) => item.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, memberList, sponsors, listId]);

  const colDefs = useMemo<ColDef<MemberSearch | BasicListMember | WeeklyMember>[]>(
    () => [
      {
        field: 'username',
        headerName: 'Username',
        width: 200,
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'fullName',
        headerName: 'Full Name',
        width: 150,
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({
          data,
        }: CustomCellRendererProps<MemberSearch | BasicListMember | WeeklyMember>) =>
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
    <AgGrid<MemberSearch | BasicListMember | WeeklyMember>
      gridKey="campaign-members-list"
      loading={sponsor ? sponsorLoading : listId ? listLoading : loading}
      rowData={sponsor ? sponsors : weekly ? [] : listId ? memberList?.members ?? [] : members}
      columnDefs={colDefs}
      pagination={false}
    />
  );
}
