import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useCallback } from 'react';
import { useMutation, useQuery as useGraphQuery } from '@apollo/client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useQuery, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { gql } from 'src/__generated__/gql';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import { SearchInput } from 'src/components/SearchInput';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/Table';

import UserTableRow from './UserTableRow';
import UserTableFiltersResult from './UserTableFiltersResult';

import type { UserRole, IUserPrismaFilter, IUserTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: UserRole; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'createdAt', label: 'Created At', width: 200, sortable: true },
  { id: 'updatedAt', label: 'Updated At', width: 200, sortable: true },
  { id: 'deletedAt', label: 'Status', width: 95, sortable: true },
  { id: 'action', label: 'Action', width: 50 },
];

const defaultFilter: IUserTableFilters = {
  search: '',
  status: 'all',
};

// ----------------------------------------------------------------------

const FETCH_USER_STATS_QUERY = gql(/* GraphQL */ `
  query FetchUserStats(
    $adminFilter: JSONObject
    $apFilter: JSONObject
    $inactiveFilter: JSONObject
  ) {
    all: admins {
      total
    }
    admin: admins(filter: $adminFilter) {
      total
    }
    user: admins(filter: $apFilter) {
      total
    }
    inactive: admins(filter: $inactiveFilter) {
      total
    }
  }
`);

const FETCH_USERS_QUERY = gql(/* GraphQL */ `
  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {
    admins(page: $page, filter: $filter, sort: $sort) {
      admins {
        id
        email
        avatar
        username
        fullName
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

const REMOVE_USERS = gql(/* GraphQL */ `
  mutation RemoveAdmins($data: IDsInput!) {
    removeAdmins(data: $data) {
      count
    }
  }
`);

// ----------------------------------------------------------------------

export default function UserListView() {
  const table = useTable({ defaultDense: true });

  const router = useRouter();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery<IUserTableFilters>();

  const { page = { page: 1, pageSize: 10 }, sort, filter = defaultFilter } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IUserPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { name: { contains: filter.search } },
        { email: { contains: filter.search } },
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

  const { data: statsData } = useGraphQuery(FETCH_USER_STATS_QUERY, {
    variables: {
      inactiveFilter: { deletedAt: { not: null } },
    },
  });

  const { loading, data } = useGraphQuery(FETCH_USERS_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: graphQueryFilter,
      sort: graphQuerySort,
    },
  });

  const [removeUsers] = useMutation(REMOVE_USERS, {
    variables: { data: { ids: table.selected } },
  });

  const tableData = data?.admins;

  const notFound = (canReset && !tableData?.admins?.length) || !tableData?.admins?.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: UserRole) => {
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
        heading="Admin"
        links={[{ name: 'Admin', href: paths.dashboard.user.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Admin
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
          <UserTableFiltersResult results={tableData!.total!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={loading ? 0 : tableData!.admins!.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData!.admins!.map((row) => row!.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
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
                rowCount={loading ? 0 : tableData!.admins!.length}
                numSelected={table.selected.length}
                onSort={(id) => {
                  const isAsc = sort && sort[id] === 'asc';
                  const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                  setQuery({ ...query, sort: newSort });
                }}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData!.admins!.map((row) => row!.id)
                  )
                }
              />
              {loading ? (
                <>
                  <TableSkeleton />
                  <TableSkeleton />
                  <TableSkeleton />
                  <TableSkeleton />
                  <TableSkeleton />
                </>
              ) : (
                <TableBody>
                  {tableData!.admins!.map((row) => (
                    <UserTableRow
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
        title="Delete"
        content="Are you sure?"
        open={confirm.value}
        onClose={confirm.onFalse}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              confirm.onFalse();

              removeUsers();

              router.refresh();
            }}
          >
            Confirm
          </Button>
        }
      />
    </DashboardContent>
  );
}
