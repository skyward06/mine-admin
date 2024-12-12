import type { Member } from 'src/__generated__/graphql';
import type { SortOrder } from 'src/routes/hooks/useQuery';
import type { IMemberPrismaFilter, IMemberTableFilters } from 'src/sections/Members/List/types';

import { useMemo, useEffect, useCallback } from 'react';

import { Card, Stack, Table, TableBody, TableContainer } from '@mui/material';

import { useQuery } from 'src/routes/hooks';

import { ScrollBar } from 'src/components/ScrollBar';
import { SearchInput } from 'src/components/SearchInput';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import { useFetchMembers } from 'src/sections/Members/useApollo';

import MemberTableRow from './MemberTableRow';
import MemberTableFiltersResult from './MemberTableFiltersResult';

interface Props {
  currentMember: Member;
}

const TABLE_HEAD = [
  { id: 'username', label: 'Username', sortable: true },
  { id: 'fullName', label: 'Full Name', sortable: true },
  { id: 'mobile', label: 'Mobile', sortable: true },
  { id: 'assetId', label: 'AssetID', sortable: true },
  { id: 'point', label: 'Point', sortable: true },
  { id: 'createdAt', label: 'Created At', sortable: true },
];

const defaultFilter: IMemberTableFilters = {
  search: '',
  status: 'all',
};

export default function PlacementListViewWithReactFlowProvider({ currentMember }: Props) {
  const table = useTable({ defaultDense: true });

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IMemberTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IMemberPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { email: { contains: filter.search, mode: 'insensitive' } },
        { assetId: { contains: filter.search, mode: 'insensitive' } },
        { mobile: { contains: filter.search, mode: 'insensitive' } },
        { username: { contains: filter.search, mode: 'insensitive' } },
        { fullName: { contains: filter.search, mode: 'insensitive' } },
        { primaryAddress: { contains: filter.search, mode: 'insensitive' } },
        { memberWallets: { some: { address: { contains: filter.search, mode: 'insensitive' } } } },
      ];
    }

    filterObj.sponsorId = currentMember.id;

    return filterObj;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const canReset = !!filter.search;

  const { loading, members, rowCount, fetchMembers } = useFetchMembers();

  useEffect(() => {
    fetchMembers({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        filter: graphQueryFilter,
        sort: graphQuerySort,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const notFound = (canReset && !members?.length) || !members?.length;

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <Card>
      <Stack>
        <SearchInput search={filter.search} onSearchChange={handleSearchChange} />
      </Stack>

      {canReset && !loading && (
        <MemberTableFiltersResult results={rowCount} sx={{ p: 2.5, pt: 0 }} />
      )}

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <ScrollBar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={sort && sort[Object.keys(sort)[0]]}
              orderBy={sort && Object.keys(sort)[0]}
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : members!.length}
              onSort={(id) => {
                if (id !== 'action') {
                  const isAsc = sort && sort[id] === 'asc';
                  const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                  setQuery({ ...query, sort: newSort });
                }
              }}
            />
            {loading ? (
              <>
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
              </>
            ) : (
              <TableBody>
                {members!.map((row) => (
                  <MemberTableRow key={row!.id} row={row!} />
                ))}

                <TableNoData notFound={notFound} />
              </TableBody>
            )}
          </Table>
        </ScrollBar>
      </TableContainer>

      <TablePaginationCustom
        count={loading ? 0 : rowCount!}
        page={loading ? 0 : page!.page - 1}
        rowsPerPage={page?.pageSize}
        onPageChange={(_, curPage) => {
          setPage(curPage + 1);
        }}
        onRowsPerPageChange={(event) => {
          setPageSize(parseInt(event.target.value, 10));
        }}
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}
