import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import dayjs from 'dayjs';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { useQuery } from 'src/routes/hooks';

import { customizeDate } from 'src/utils/format-time';

import { COMMISSION_TYPE } from 'src/consts';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import { SearchInput } from 'src/components/SearchInput';
import { usePopover } from 'src/components/custom-popover';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/Table';

import AllSelected from './AllSelected';
import ProductTableRow from './CommissionTableRow';
import SearchPeriod from '../../Placement/List/searchPeriod';
import ProductTableFiltersResult from './CommissionTableFiltersResult';
import { useFetchCommissions, useFetchCommissionStats } from '../useApollo';

import type { CommissionRole, ICommissionPrismaFilter, ICommissionTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: CommissionRole; label: string; color: LabelColor }[] = [
  { value: 'pending', label: 'Pending', color: 'info' },
  { value: 'approved', label: 'Approved', color: 'info' },
  { value: 'declined', label: 'Declined', color: 'error' },
  { value: 'paid', label: 'Paid', color: 'success' },
];

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', sortable: true },
  { id: 'weekStartDate', label: 'Week', sortable: true },
  { id: 'member.username', label: 'Username', width: 150, sortable: true },
  { id: 'member.assetId', label: 'AssetId', sortable: true },
  { id: 'begLR', label: 'BegLR', sortable: false },
  { id: 'newLR', label: 'NewLR', sortable: false },
  { id: 'maxLR', label: 'MaxLR', sortable: false },
  { id: 'pkgLR', label: 'Package', sortable: true },
  { id: 'endLR', label: 'EndLR', sortable: true },
  { id: 'commission', label: 'Commissions', sortable: true },
  { id: 'shortNote', label: 'Note', width: 250, sortable: true },
  { id: 'action', label: 'Action', sortable: true, align: 'center', pinned: 'right' },
];

const defaultFilter: ICommissionTableFilters = {
  search: '',
  status: 'pending',
};

interface Props {
  openWeek: UseBooleanReturn;
}

export default function CommissionListView({ openWeek }: Props) {
  const popover = usePopover();
  const table = useTable({ defaultDense: true });
  const [status, setStatus] = useState<CommissionRole>('pending');

  const { fetchCommissionStats, data: statsData } = useFetchCommissionStats();
  const { fetchCommissions, loading, rowCount, weeklyCommissions } = useFetchCommissions();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<ICommissionTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { ID: 'asc', memberId: 'asc' },
    filter = defaultFilter,
    weekStartDate = customizeDate(`${dayjs().endOf('week').add(1, 'day')}`),
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: ICommissionPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [{ member: { username: { contains: filter.search, mode: 'insensitive' } } }];
    }

    if (filter.status === 'pending') {
      filterObj.status = COMMISSION_TYPE.PENDING.label;
    } else if (filter.status === 'paid') {
      filterObj.status = COMMISSION_TYPE.PAID.label;
    } else if (filter.status === 'approved') {
      filterObj.status = COMMISSION_TYPE.APPROVED.label;
    } else {
      filterObj.status = COMMISSION_TYPE.DECLINED.label;
    }

    filterObj.weekStartDate = {
      lt: weekStartDate,
    };

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
        declinedFilter: {
          status: COMMISSION_TYPE.DECLINED.label,
          weekStartDate: { lt: weekStartDate },
        },
        pendingFilter: {
          status: COMMISSION_TYPE.PENDING.label,
          weekStartDate: { lt: weekStartDate },
        },
        paidFilter: {
          status: COMMISSION_TYPE.PAID.label,
          weekStartDate: { lt: weekStartDate },
        },
        approvedFilter: {
          status: COMMISSION_TYPE.APPROVED.label,
          weekStartDate: { lt: weekStartDate },
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

    setStatus(filter.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const notFound = (canReset && !weeklyCommissions?.length) || !weeklyCommissions?.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: CommissionRole) => {
    setStatus(newValue);

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

  const onPeriodChange = (value: any) => {
    fetchCommissions({
      variables: {
        filter: {
          weekStartDate: {
            lt: customizeDate(`${dayjs(value).endOf('week').add(1, 'day')}`),
          },
        },
        page: page && `${page.page},${page.pageSize}`,
        sort: graphQuerySort,
      },
    });

    setQuery({
      ...query,
      weekStartDate: customizeDate(`${dayjs(value).endOf('week').add(1, 'day')}`),
    });

    openWeek.onFalse();
  };

  return (
    <>
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

        <Stack direction="row">
          <Stack width={0.025} sx={{ pl: 2, pt: 2.5 }}>
            <AllSelected status={status} table={table} popover={popover} />
          </Stack>
          <Stack width={0.97}>
            <SearchInput search={filter.search} onSearchChange={handleSearchChange} />
          </Stack>
        </Stack>

        {canReset && !loading && (
          <ProductTableFiltersResult results={rowCount!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={loading ? 0 : weeklyCommissions!.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                weeklyCommissions!.map((row) => row!.id)
              )
            }
            action={
              <Tooltip title="Transfer" placement="top" arrow>
                <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                  <Iconify icon="si:more-horiz-fill" />
                </IconButton>
              </Tooltip>
            }
          />

          <ScrollBar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={sort && sort[Object.keys(sort)[0]]}
                orderBy={sort && Object.keys(sort)[0]}
                headLabel={TABLE_HEAD}
                rowCount={loading ? 0 : weeklyCommissions!.length}
                numSelected={table.selected.length}
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
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    weeklyCommissions!.map((row) => row!.id)
                  )
                }
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
                    <ProductTableRow
                      key={row!.id}
                      row={row!}
                      selected={table.selected.includes(row!.id)}
                      onSelectRow={() => table.onSelectRow(row!.id)}
                    />
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
