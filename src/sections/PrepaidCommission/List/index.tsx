import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { SearchInput } from 'src/components/SearchInput';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import PrepaidTableRow from './PrepaidTableRow';
import { useFetchPrepaid, useRemovePrepaid } from '../useApollo';
import PrepaidTableFiltersResult from './PrepaidTableFiltersResult';

import type { IPrepaidPrismaFilter, IPrepaidTableFilters } from './types';

const TABLE_HEAD = [
  { id: 'orderedAt', label: 'Date', width: 200, sortable: true },
  { id: 'member.username', label: 'Username', sortable: true },
  { id: 'commission', label: 'Commission', width: 200, sortable: true },
  { id: 'pkgLR', label: 'Package', sortable: true },
  { id: 'weekStartDate', label: 'Week', width: 200, sortable: true },
  { id: 'action', label: 'Action', align: 'center', width: 200, sortable: true },
];

const defaultFilter: IPrepaidTableFilters = {
  search: '',
};

export default function PrepaidCommissionListView() {
  const table = useTable({ defaultDense: true });
  const [selected, setSelected] = useState<string>('');
  const removeConfirm = useBoolean();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IPrepaidTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IPrepaidPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [{ sale: { productName: { contains: filter.search, mode: 'insensitive' } } }];
    }

    return filterObj;
  }, [filter]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { loading: removeLoading, removePrepaid } = useRemovePrepaid();
  const { loading, prepaid, rowCount, fetchPrepaid } = useFetchPrepaid();

  const canReset = !!filter.search;
  const notFound = (canReset && !prepaid?.length) || !prepaid?.length;

  useEffect(() => {
    fetchPrepaid({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        filter: graphQueryFilter,
        sort: graphQuerySort,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Prepaid Commission"
        links={[
          { name: 'Prepaid Commission', href: paths.dashboard.commission.root },
          { name: 'All' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.prepaidCommission.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Prepayment
          </Button>
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Card>
        <SearchInput search={filter.search} onSearchChange={handleSearchChange} />

        {canReset && !loading && (
          <PrepaidTableFiltersResult results={rowCount!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <ScrollBar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1260 }}>
            <TableHeadCustom
              order={sort && sort[Object.keys(sort)[0]]}
              orderBy={sort && Object.keys(sort)[0]}
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : prepaid!.length}
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
                {prepaid!.map((row: any) => (
                  <PrepaidTableRow
                    key={row!.id}
                    row={row!}
                    removeConfirm={removeConfirm}
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
        open={removeConfirm.value}
        onClose={removeConfirm.onFalse}
        title="Delete"
        content={
          <>
            <Typography>This member will be removed permanently!</Typography>
            <Typography>Are you sure?</Typography>
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={removeLoading}
            onClick={async () => {
              const promise = await removePrepaid({ variables: { data: { id: selected } } });
              const result = promise.data?.removePrepaidCommission.result;

              if (result === 'success') {
                toast.success('Prepayment removed successfully');
              } else {
                toast.error('You are not allowed to remove this prepayment');
              }

              removeConfirm.onFalse();
            }}
          >
            Confirm
          </LoadingButton>
        }
      />
    </DashboardContent>
  );
}
