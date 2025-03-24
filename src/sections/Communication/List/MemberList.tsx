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

import { useFetchMemberListById } from '../useApollo';

interface Props {
  filter: any;
  listId: string;
}

export default function MemberListView({ filter: categoryFilter, listId }: Props) {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () => parseFilterModel({ ...categoryFilter, status: true }, filter),
    [filter, categoryFilter]
  );

  const { loading, rowCount, members, fetchMembers } = useFetchMembers();
  const { loading: listLoading, memberList, fetchMemberListById } = useFetchMemberListById();

  useEffect(() => {
    if (listId) {
      fetchMemberListById({ variables: { data: { id: listId } } });
    } else {
      fetchMembers({ variables: { filter: graphQueryFilter, page, sort } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort, listId]);

  const colDefs = useMemo<ColDef<Member | BasicListMember>[]>(
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
        cellRenderer: ({ data }: CustomCellRendererProps<Member | BasicListMember>) =>
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
    <AgGrid<Member | BasicListMember>
      gridKey="communication-members-list"
      loading={listId ? listLoading : loading}
      rowData={listId ? memberList?.members ?? [] : members}
      columnDefs={colDefs}
      totalRowCount={listId ? memberList?.members.length ?? 0 : rowCount}
    />
  );
}
