import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import { Tab, Tabs, alpha } from '@mui/material';

import { useQuery } from 'src/routes/hooks';

import { CONFIG } from 'src/config';

import { Label } from 'src/components/Label';
import { ScrollBar } from 'src/components/ScrollBar';
import ExportButton from 'src/components/ExportButton';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import { useFetchOnepointAwayMembers } from '../useApollo';
import OnepointMemberTableRow from './OnepointMemberTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Username', sortable: true },
  { id: 'fullName', label: 'Full Name', sortable: true },
  { id: 'mobile', label: 'Mobile', sortable: true },
  { id: 'assetId', label: 'AssetID', sortable: true },
  { id: 'totalIntroducers', label: 'Sponsor', sortable: true },
  { id: 'createdAt', label: 'Created At', sortable: true },
];

export default function OnepointMemberListView() {
  const table = useTable({ defaultDense: true });

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery();

  const { page = { page: 1, pageSize: 10 }, sort = { createdAt: 'asc' } } = query;

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { loading, members, rowCount, fetchMembers } = useFetchOnepointAwayMembers();

  useEffect(() => {
    fetchMembers({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        sort: graphQuerySort,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const token = localStorage.getItem(CONFIG.storageTokenKey) ?? '';
  const notFound = !members?.length;

  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          marginBottom: 0.2,
          boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        <Tabs
          value="all"
          sx={{
            px: 3.5,
            flex: 1,
          }}
        >
          <Tab
            key="all"
            iconPosition="end"
            value="all"
            label="All"
            icon={
              <Label variant="filled" color="info">
                {rowCount}
              </Label>
            }
          />
        </Tabs>
        <Stack width={0.1} sx={{ p: 0.5 }}>
          <ExportButton target="export-onepoint-away-members" token={token} />
        </Stack>
      </Stack>

      <ScrollBar>
        <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1260 }}>
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
            </>
          ) : (
            <TableBody>
              {members!.map((row) => (
                <OnepointMemberTableRow key={row!.ID} row={row!} />
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
