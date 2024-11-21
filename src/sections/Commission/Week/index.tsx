import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { useQuery } from 'src/routes/hooks';

import { customizeDate } from 'src/utils/format-time';

import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import ProductTableRow from './CommissionTableRow';
import { useFetchCommissionsByWeek } from '../useApollo';
import SearchPeriod from '../../Placement/List/searchPeriod';

import type { ICommissionTableFilters } from './types';

const TABLE_HEAD = [
  { id: 'weekStartDate', label: 'Week', width: 300, sortable: false },
  { id: 'total sales', label: 'Total Sales', sortable: false },
  { id: 'total revenue', label: 'Revenue($)', sortable: false },
  { id: 'total members', label: 'Total Members', sortable: false },
  { id: 'commission', label: 'Commission', sortable: false },
  { id: '%', label: '%', sortable: false },
  { id: 'action', label: 'Action', width: 150, sortable: false, align: 'center' },
];

interface Props {
  openWeek: UseBooleanReturn;
}

export default function CommissionListView({ openWeek }: Props) {
  const table = useTable({ defaultDense: true });

  const { fetchWeekCommissions, loading, rowCount, weeklyCommissions } =
    useFetchCommissionsByWeek();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<ICommissionTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { weekStartDate: 'asc' },
    weekStartDate = customizeDate(`${dayjs().startOf('week')}`),
  } = query;

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  useEffect(() => {
    fetchWeekCommissions({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        sort: graphQuerySort,
        weekStartDate,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const notFound = !weeklyCommissions?.length;

  const onPeriodChange = (value: any) => {
    fetchWeekCommissions({
      variables: {
        weekStartDate: customizeDate(`${dayjs(value).startOf('week')}`),
        page: page && `${page.page},${page.pageSize}`,
        sort: graphQuerySort,
      },
    });

    setQuery({
      ...query,
      weekStartDate: customizeDate(`${dayjs(value).startOf('week')}`),
    });

    openWeek.onFalse();
  };

  return (
    <>
      <Card>
        <ScrollBar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={sort && sort[Object.keys(sort)[0]]}
              orderBy={sort && Object.keys(sort)[0]}
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : weeklyCommissions!.length}
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

      <ConfirmDialog
        open={openWeek.value}
        onClose={openWeek.onFalse}
        title="Select Week"
        content={<SearchPeriod current={weekStartDate} onChange={onPeriodChange} />}
        action={null}
      />
    </>
  );
}
