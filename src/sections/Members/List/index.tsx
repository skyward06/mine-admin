import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/useBoolean';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import ExportButton from 'src/components/ExportButton';
import { SearchInput } from 'src/components/SearchInput';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import MemberTableRow from './MemberTableRow';
import MemberTableFiltersResult from './MemberTableFiltersResult';
import { useRemoveMember, useFetchMembers, useFetchMembersStats } from '../useApollo';

import type { MemberRole, IMemberPrismaFilter, IMemberTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: MemberRole; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'username', label: 'Username', sortable: true },
  { id: 'fullName', label: 'Full Name', sortable: true },
  { id: 'mobile', label: 'Mobile', width: 150, sortable: true },
  { id: 'primaryAddress', label: 'Address', sortable: true },
  { id: 'assetId', label: 'AssetID', width: 100, sortable: true },
  { id: 'createdAt', label: 'Created At', width: 150, sortable: true },
  { id: 'action', label: 'Action', align: 'center', width: 50 },
];

const defaultFilter: IMemberTableFilters = {
  search: '',
  status: 'all',
};

export default function MemberListView() {
  const table = useTable({ defaultDense: true });
  const [selected, setSelected] = useState<string>('');

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IMemberTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IMemberPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { email: { contains: filter.search, mode: 'insensitive' } },
        { assetId: { contains: filter.search, mode: 'insensitive' } },
        { mobile: { contains: filter.search, mode: 'insensitive' } },
        { username: { contains: filter.search, mode: 'insensitive' } },
        { fullName: { contains: filter.search, mode: 'insensitive' } },
        { primaryAddress: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    if (filter.status === 'inactive') {
      filterObj.deletedAt = { not: null };
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

  const { loading, members, rowCount, fetchMembers } = useFetchMembers();

  const { data: statsData, fetchMemberStats } = useFetchMembersStats();

  useEffect(() => {
    fetchMembers({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        filter: graphQueryFilter,
        sort: graphQuerySort,
      },
    });

    fetchMemberStats({
      variables: { inactiveFilter: { deletedAt: { not: null } } },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { removeMember, loading: removeLoading } = useRemoveMember();

  const notFound = (canReset && !members?.length) || !members?.length;

  const token = localStorage.getItem(CONFIG.storageTokenKey) ?? '';

  const handleTabChange = (event: React.SyntheticEvent, newValue: MemberRole) => {
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
        heading="Member"
        links={[{ name: 'Member', href: paths.dashboard.members.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.members.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Member
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

        <Stack direction="row">
          <Stack width={1}>
            <SearchInput search={filter.search} onSearchChange={handleSearchChange} />
          </Stack>
          <Stack width={0.1} sx={{ p: 2.5 }}>
            <ExportButton target="members" token={token} />
          </Stack>
        </Stack>

        {canReset && !loading && (
          <MemberTableFiltersResult results={rowCount} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <ScrollBar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
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
                  <TableSkeleton height={26} />
                  <TableSkeleton height={26} />
                  <TableSkeleton height={26} />
                </>
              ) : (
                <TableBody>
                  {members!.map((row) => (
                    <MemberTableRow
                      key={row!.id}
                      row={row!}
                      selected={table.selected.includes(row!.id)}
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
          <>
            <Typography>This sale will be removed permanently!</Typography>
            <Typography>Are you sure?</Typography>
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={removeLoading}
            onClick={async () => {
              const promise = await removeMember({ variables: { data: { id: selected } } });
              const result = promise.data?.removeMember.result;

              if (result === 'success') {
                toast.success('Member removed successfully');
              } else {
                toast.error('You are not allowed to remove this member');
              }

              confirm.onFalse();
            }}
          >
            Confirm
          </LoadingButton>
        }
      />
    </DashboardContent>
  );
}
