import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useState, useCallback } from 'react';
import { useMutation, useQuery as useGraphQuery } from '@apollo/client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import { SearchInput } from 'src/components/SearchInput';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import SaleTableRow from './SaleTableRow';
import SaleTableFiltersResult from './SaleTableFiltersResult';
import { REMOVE_SALE, FETCH_SALES_QUERY, FETCH_SALES_STATS_QUERY } from '../query';

import type { SaleRole, ISalePrismaFilter, ISaleTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: SaleRole; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'invoiceNo', label: 'Invoice No', width: 150, sortable: true },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'member.mobile', label: 'Mobile', width: 130 },
  { id: 'member.assetId', label: 'Asset ID', width: 90 },
  { id: 'package.productName', label: 'Product Name', width: 200 },
  { id: 'paymentMethod', label: 'Payment Method', width: 250, sortable: true },
  { id: 'package.amount', label: 'Amount', width: 90 },
  { id: 'package.hashPower', label: 'Hash Power', width: 150 },
  { id: 'orderedAt', label: 'Ordered At', width: 110, sortable: true },
  { id: 'action', label: 'Action', align: 'center' },
];

const defaultFilter: ISaleTableFilters = {
  search: '',
  status: 'all',
};

export default function SaleListView() {
  const table = useTable({ defaultDense: true });
  const [selected, setSelected] = useState<string>('');

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery<ISaleTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { invoiceNo: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: ISalePrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { paymentMethod: { contains: filter.search, mode: 'insensitive' } },
        { member: { username: { contains: filter.search, mode: 'insensitive' } } },
        { member: { email: { contains: filter.search, mode: 'insensitive' } } },
        { member: { mobile: { contains: filter.search, mode: 'insensitive' } } },
        { package: { productName: { contains: filter.search, mode: 'insensitive' } } },
      ];
    }

    if (filter.status === 'inactive') {
      filterObj.status = false;
    } else {
      filterObj.status = true;
    }

    return filterObj;
  }, [filter]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const confirm = useBoolean();

  const canReset = !!filter.search;

  const { data: statsData } = useGraphQuery(FETCH_SALES_STATS_QUERY, {
    variables: {
      inactiveFilter: { status: false },
    },
  });

  const { loading, data } = useGraphQuery(FETCH_SALES_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: graphQueryFilter,
      sort: graphQuerySort,
    },
  });

  const [removeSale, { loading: removeLoading }] = useMutation(REMOVE_SALE, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchSales'],
  });

  const tableData = data?.sales;

  const notFound = (canReset && !tableData?.sales?.length) || !tableData?.sales?.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: SaleRole) => {
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
        heading="Sale"
        links={[{ name: 'Sale', href: paths.dashboard.sales.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.sales.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Sale
          </Button>
        }
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
          <SaleTableFiltersResult results={tableData!.total!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <ScrollBar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={sort && sort[Object.keys(sort)[0]]}
                orderBy={sort && Object.keys(sort)[0]}
                headLabel={TABLE_HEAD}
                rowCount={loading ? 0 : tableData!.sales!.length}
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
                  {tableData!.sales!.map((row) => (
                    <SaleTableRow
                      key={row!.id}
                      row={row!}
                      confirm={confirm}
                      setSelected={setSelected}
                    />
                  ))}

                  <TableNoData notFound={notFound} />
                </TableBody>
              )}
            </Table>
          </ScrollBar>
        </TableContainer>

        <TablePaginationCustom
          count={loading ? 0 : tableData!.total!}
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
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          removeLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <Typography>This sale will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          )
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              const promise = await removeSale({ variables: { data: { id: selected } } });
              const result = promise.data?.removeSale.result;

              if (result === 'success') {
                toast.success('Sale removed successfully');
              } else {
                toast.error('You are not allowed to remove this sale');
              }

              confirm.onFalse();
            }}
          >
            Confirm
          </Button>
        }
      />
    </DashboardContent>
  );
}
