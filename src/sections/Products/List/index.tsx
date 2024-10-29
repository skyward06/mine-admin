import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

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

import ProductTableRow from './ProductTableRow';
import ProductTableFiltersResult from './ProductTableFiltersResult';
import { useRemovePackage, useFetchPackages, useFetchPackageStats } from '../useApollo';

import type { ProductRole, IProductPrismaFilter, IProductTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: ProductRole; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'date', label: 'Date', width: 200, sortable: true },
  { id: 'amonut', label: 'Amount', width: 200, sortable: true },
  { id: 'productName', label: 'Product Name', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'point', label: 'Point', sortable: true },
  { id: 'token', label: 'Hash Power', width: 200, sortable: true },
  { id: 'enrollVisibility', label: 'Visibility', align: 'center', sortable: true },
  { id: 'action', label: 'Action', align: 'center', width: 200, sortable: true },
];

const defaultFilter: IProductTableFilters = {
  search: '',
  status: 'all',
};

export default function ProductListView() {
  const table = useTable({ defaultDense: true });
  const [selected, setSelected] = useState<string>('');

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IProductTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IProductPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [{ productName: { contains: filter.search, mode: 'insensitive' } }];
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

  const { loading: removeLoading, removePackage } = useRemovePackage();
  const { stats, fetchPackageStats } = useFetchPackageStats();
  const { loading, rowCount, packages, fetchPackages } = useFetchPackages();

  useEffect(() => {
    fetchPackages({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        filter: graphQueryFilter,
        sort: graphQuerySort,
      },
    });

    fetchPackageStats({
      variables: {
        allFilter: { status: true },
        inactiveFilter: { status: false },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notFound = (canReset && !packages?.length) || !packages?.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: ProductRole) => {
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
        heading="Product"
        links={[{ name: 'Product', href: paths.dashboard.products.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.products.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Product
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
                  {stats ? stats[tab.value].total! : 0}
                </Label>
              }
            />
          ))}
        </Tabs>

        <SearchInput search={filter.search} onSearchChange={handleSearchChange} />

        {canReset && !loading && (
          <ProductTableFiltersResult results={rowCount!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <ScrollBar sx={{ maxHeight: 480 }}>
          <Table stickyHeader size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1260 }}>
            <TableHeadCustom
              order={sort && sort[Object.keys(sort)[0]]}
              orderBy={sort && Object.keys(sort)[0]}
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : packages!.length}
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
                {packages!.map((row: any) => (
                  <ProductTableRow
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
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          removeLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <Typography>This product will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          )
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              const promise = await removePackage({ variables: { data: { id: selected } } });
              const result = promise.data?.removePackage.result;

              if (result === 'success') {
                toast.success('Product removed successfully');
              } else {
                toast.error('You are not allowed to remove this product');
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
