import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import dayjs from 'dayjs';
import { useMemo, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useQuery, useParams } from 'src/routes/hooks';

import { COMMISSION_TYPE } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { ScrollBar } from 'src/components/ScrollBar';
import { SearchInput } from 'src/components/SearchInput';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import ProductTableRow from './CommissionTableRow';
import ProductTableFiltersResult from './CommissionTableFiltersResult';
import { useFetchCommissions, useFetchCommissionStats } from '../useApollo';

import type { CommissionRole, ICommissionPrismaFilter, ICommissionTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: CommissionRole; label: string; color: LabelColor }[] = [
  { value: 'pending', label: 'Pending', color: 'info' },
  { value: 'sent', label: 'Sent', color: 'success' },
  { value: 'decline', label: 'Declined', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'weekStartDate', label: 'Week', width: 300, sortable: true },
  { id: 'member.username', label: 'Username', sortable: true },
  { id: 'before', label: 'Before', sortable: false },
  { id: 'package', label: 'Package', sortable: false },
  { id: 'commission', label: 'Commissions', width: 200, sortable: true },
  { id: 'after', label: 'After', width: 200, sortable: true },
  { id: 'action', label: 'Action', width: 150, sortable: true, align: 'center' },
];

const defaultFilter: ICommissionTableFilters = {
  search: '',
  status: 'pending',
};

export default function CommissionDetail() {
  const table = useTable({ defaultDense: true });
  const { id: weekStartDate } = useParams();

  const { fetchCommissionStats, data: statsData } = useFetchCommissionStats();
  const { fetchCommissions, loading, rowCount, weeklyCommissions } = useFetchCommissions();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<ICommissionTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { weekStartDate: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: ICommissionPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [{ member: { username: { contains: filter.search, mode: 'insensitive' } } }];
    }

    if (filter.status === 'pending') {
      filterObj.status = COMMISSION_TYPE.PENDING;
    } else if (filter.status === 'sent') {
      filterObj.status = COMMISSION_TYPE.CONFIRM;
    } else {
      filterObj.status = COMMISSION_TYPE.BLOCK;
    }

    filterObj.commission = { gt: 0 };
    filterObj.weekStartDate = weekStartDate;

    return filterObj;
  }, [filter, weekStartDate]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const canReset = !!filter.search;

  useEffect(() => {
    fetchCommissionStats({
      variables: {
        declineFilter: {
          status: COMMISSION_TYPE.BLOCK,
          commission: { gt: 0 },
          weekStartDate,
        },
        pendingFilter: {
          status: COMMISSION_TYPE.PENDING,
          commission: { gt: 0 },
          weekStartDate,
        },
        sentFilter: {
          status: COMMISSION_TYPE.CONFIRM,
          commission: { gt: 0 },
          weekStartDate,
        },
      },
    });

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: CommissionRole) => {
    setQuery({
      ...query,
      filter: { ...filter, status: newValue },
      page: { page: 1, pageSize: query.page?.pageSize ?? 10 },
    });
  };

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Commission"
        links={[
          { name: 'Commission', href: paths.dashboard.commission.root },
          {
            name: `${dayjs(weekStartDate).format('MMM-ww')} (${dayjs().add(1, 'day').format('MM/DD')} - ${dayjs(weekStartDate).add(7, 'day').format('MM/DD')})`,
          },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Card>
        <Tabs
          value={filter.status}
          onChange={handleTabChange}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={(tab.value === filter.status && 'filled') || 'soft'}
                  color={tab.color}
                >
                  {statsData ? statsData[tab.value].total! : 0}
                </Label>
              }
            />
          ))}
        </Tabs>

        <SearchInput search={filter.search} onSearchChange={handleSearchChange} />

        {canReset && !loading && (
          <ProductTableFiltersResult results={rowCount!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <ScrollBar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={sort && sort[Object.keys(sort)[0]]}
                orderBy={sort && Object.keys(sort)[0]}
                headLabel={TABLE_HEAD}
                rowCount={loading ? 0 : weeklyCommissions!.length}
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
                  {weeklyCommissions!.map((row: any) => (
                    <ProductTableRow key={row!.id} row={row!} />
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
    </DashboardContent>
  );
}
