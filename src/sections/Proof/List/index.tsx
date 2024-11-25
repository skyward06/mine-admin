import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

// import { canConvertToNumber } from 'src/utils/helper';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/useBoolean';

import { ProofType } from 'src/__generated__/graphql';
import { DashboardContent } from 'src/layouts/dashboard';

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

import { PROOF_VALUES } from '../const';
import ProofTableRow from './ProofTableRow';
import { useFetchProofs, useRemoveProof } from '../useApollo';
import ProofTableFiltersResult from './ProofTableFiltersResult';

import type { PROOF_KEY_VALUE_TYPE } from '../const';
import type { IProofPrismaFilter, IProofTableFilters } from './types';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'amount', label: 'Amount', width: 200, sortable: true },
  { id: 'type', label: 'Proof Type', sortable: true },
  { id: 'attached', label: 'Attached', width: 150, sortable: true },
  { id: 'createdAt', label: 'Created At', width: 150, sortable: true },
  { id: 'orderedAt', label: 'Ordered At', width: 150, sortable: true },
  { id: 'action', label: 'Action', align: 'center', width: 200, sortable: true },
];

const defaultFilter: IProofTableFilters = {
  search: '',
  status: 'all',
};

export default function ProofListView() {
  const table = useTable({ defaultDense: true });
  const [selected, setSelected] = useState<string>('');

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IProofTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IProofPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        // ...(canConvertToNumber(filter.search) && { amount: { equals: filter.search } }),
        ...Object.values(ProofType)
          .map((pft: ProofType) => {
            const detail = PROOF_VALUES[pft as PROOF_KEY_VALUE_TYPE];
            if (detail) {
              return detail.includes(filter.search.toUpperCase())
                ? { type: { equals: pft } }
                : null;
            }
            return null;
          })
          .filter(Boolean),
        { refId: { contains: filter.search, mode: 'insensitive' } },
      ];
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

  const { loading, rowCount, proofs, fetchProofs } = useFetchProofs();
  const { loading: removeLoading, removeProof } = useRemoveProof();

  useEffect(() => {
    fetchProofs({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        filter: graphQueryFilter,
        sort: graphQuerySort,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const notFound = (canReset && !proofs?.length) || !proofs?.length;

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Proof"
        links={[{ name: 'Proof', href: paths.dashboard.proof.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.proof.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Proof
          </Button>
        }
      />

      <Card>
        <SearchInput search={filter.search} onSearchChange={handleSearchChange} />

        {canReset && !loading && (
          <ProofTableFiltersResult results={rowCount!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <ScrollBar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1260 }}>
            <TableHeadCustom
              order={sort && sort[Object.keys(sort)[0]]}
              orderBy={sort && Object.keys(sort)[0]}
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : proofs!.length}
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
                {proofs!.map((row: any) => (
                  <ProofTableRow
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
              <Typography>This proof will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          )
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              const promise = await removeProof({ variables: { data: { id: selected } } });
              const result = promise.data?.removeProof.result;

              if (result === 'success') {
                toast.success('Proof removed successfully');
              } else {
                toast.error('You are not allowed to remove this proof');
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
