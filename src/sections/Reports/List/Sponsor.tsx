import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { useQuery, type SortOrder } from 'src/routes/hooks';

import { formatDate, customizeDate } from 'src/utils/format-time';

import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import SearchPeriod from 'src/sections/Placement/List/searchPeriod';

import SponsorTableRow from './SponsorTableRow';
import { useFetchSponsors } from '../useApollo';

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', width: 300, sortable: true },
  { id: 'username', label: 'Member', sortable: true },
  { id: 'fullName', label: 'FullName', width: 300, sortable: true },
  { id: 'weekIntroducers', label: 'Introducers', width: 300, sortable: false },
];

interface Props {
  openWeek: UseBooleanReturn;
}

export default function SponsorListView({ openWeek }: Props) {
  const table = useTable({ defaultDense: true });

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    weekStartDate = customizeDate(`${dayjs().startOf('week')}`),
  } = query;

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { loading, rowCount, sponsors, fetchSponsors } = useFetchSponsors();

  useEffect(() => {
    fetchSponsors({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        sort: graphQuerySort,
        week: formatDate(`${dayjs(weekStartDate).utc()}`, 'YYYY-MM-DD'),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onPeriodChange = (value: any) => {
    fetchSponsors({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        sort: graphQuerySort,
        week: formatDate(`${dayjs(weekStartDate).utc()}`, 'YYYY-MM-DD'),
      },
    });

    setQuery({
      ...query,
      weekStartDate: customizeDate(`${dayjs(value).utc().startOf('week')}`),
    });

    openWeek.onFalse();
  };

  const notFound = !sponsors?.length;

  return (
    <>
      <Card>
        <ScrollBar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={sort && sort[Object.keys(sort)[0]]}
              orderBy={sort && Object.keys(sort)[0]}
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : sponsors!.length}
              onSort={(id) => {
                if (id !== 'introducers') {
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
                {sponsors!.map((row: any) => (
                  <SponsorTableRow key={row!.id} row={row!} />
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
        content={
          <SearchPeriod
            current={`${dayjs(weekStartDate).utc().add(1, 'day')}`}
            onChange={onPeriodChange}
          />
        }
        action={null}
      />
    </>
  );
}
