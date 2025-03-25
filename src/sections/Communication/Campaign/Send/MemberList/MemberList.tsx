import type { BasicListMember } from 'src/__generated__/graphql';
import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { customizeFullName } from 'src/utils/helper';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';

import { useFetchMemberSearch } from 'src/sections/Members/useApollo';

import { useFetchMemberListById } from '../../../useApollo';

import type { MemberSearch } from './type';

interface Props {
  filter: any;
  listId: string;
  setEmails: Function;
}

export default function MemberListView({ filter: categoryFilter, listId, setEmails }: Props) {
  const [{ filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () => parseFilterModel({ ...categoryFilter, status: true }, filter),
    [filter, categoryFilter]
  );

  const { loading, members, fetchMemberSearch } = useFetchMemberSearch();
  const { loading: listLoading, memberList, fetchMemberListById } = useFetchMemberListById();

  useEffect(() => {
    if (listId) {
      fetchMemberListById({ variables: { data: { id: listId } } });
    } else {
      fetchMemberSearch({ variables: { filter: graphQueryFilter } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, listId]);

  useEffect(() => {
    if (members) {
      setEmails(members.map((item) => item.email));
    }

    if (memberList) {
      setEmails(memberList?.members.map((item) => item.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, memberList]);

  const colDefs = useMemo<ColDef<MemberSearch | BasicListMember>[]>(
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
        cellRenderer: ({ data }: CustomCellRendererProps<MemberSearch | BasicListMember>) =>
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
    <AgGrid<MemberSearch | BasicListMember>
      gridKey="campaign-members-list"
      loading={listId ? listLoading : loading}
      rowData={listId ? memberList?.members ?? [] : members}
      columnDefs={colDefs}
      pagination={false}
    />
  );
}
