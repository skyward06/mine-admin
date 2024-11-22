import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

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

import ProductTableRow from './CommissionTableRow';
import { useFetchCommissions } from '../useApollo';
import ProductTableFiltersResult from '../Member/CommissionTableFiltersResult';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'weekStartDate', label: 'Week', width: 200, sortable: true },
  { id: 'member.username', label: 'Username', sortable: true },
  { id: 'member.assetId', label: 'AssetId', sortable: true },
  { id: 'begLR', label: 'BegLR', sortable: false },
  { id: 'newLR', label: 'NewLR', sortable: false },
  { id: 'maxLR', label: 'MaxLR', sortable: false },
  { id: 'endLR', label: 'EndLR', sortable: true },
  { id: 'pkgLR', label: 'Package', sortable: true },
  { id: 'commission', label: 'Commissions', width: 200, sortable: true },
  { id: 'action', label: 'Action', width: 250, sortable: true, align: 'center' },
];

const additionalFilter = [
  { status: 'PREVIEW' },
  { OR: [{ commission: { gt: 0 } }, { newL: { gt: 0 } }, { newR: { gt: 0 } }] },
];

export default function CommissionPreviewList() {
  const table = useTable({ defaultDense: true });

  const { fetchCommissions, loading, rowCount, weeklyCommissions } = useFetchCommissions();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery<{
    search: string;
  }>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { commission: 'asc', memberId: 'asc' },
    filter = {
      search: '',
    },
  } = query;

  const graphQueryFilter = useMemo(() => {
    let filterObj: any[] = [];
    if (filter.search) {
      filterObj = [
        { OR: [{ member: { username: { contains: filter.search, mode: 'insensitive' } } }] },
      ];
    }
    filterObj = [...filterObj, ...additionalFilter];

    return { AND: filterObj };
  }, [filter]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const canReset = !!filter.search;

  useEffect(() => {
    fetchCommissions({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        filter: graphQueryFilter,
        sort: graphQuerySort,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const notFound = (canReset && !weeklyCommissions?.length) || !weeklyCommissions?.length;

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <Card>
      <SearchInput search={filter.search} onSearchChange={handleSearchChange} />

      {canReset && !loading && (
        <ProductTableFiltersResult results={rowCount!} sx={{ p: 2.5, pt: 0 }} />
      )}

      <ScrollBar>
        <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
          <TableHeadCustom
            order={sort && sort[Object.keys(sort)[0]]}
            orderBy={sort && Object.keys(sort)[0]}
            headLabel={TABLE_HEAD}
            rowCount={loading ? 0 : weeklyCommissions!.length}
            onSort={(id) => {
              if (
                id === 'weekStartDate' ||
                id === 'member.username' ||
                id === 'commission' ||
                id === 'member.assetId'
              ) {
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
              {weeklyCommissions!.map((row: any) => (
                <ProductTableRow key={row!.id} row={row!} />
              ))}

              <TableNoData notFound={notFound} />
            </TableBody>
          )}
        </Table>
      </ScrollBar>

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
