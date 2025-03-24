import type { IMemberPrismaFilter, IMemberTableFilters } from 'src/sections/Members/List/types';

import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { useQuery } from 'src/routes/hooks';

import { ScrollBar } from 'src/components/ScrollBar';
import { SearchInput } from 'src/components/SearchInput';
import {
  useTable,
  TableNoData,
  getComparator,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/Table';

import TableSkeleton from './TableSkeleton';
import { useFetchMembers } from '../useApollo';

const TABLE_HEAD = [
  { id: 'username', label: 'Username', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
];

interface Props {
  setEmails: Function;
}

const defaultFilter: IMemberTableFilters = {
  search: '',
};

export default function MemberTable({ setEmails }: Props) {
  const [query, { setQueryParams: setQuery }] = useQuery<IMemberTableFilters>();
  const table = useTable({ defaultDense: true, defaultRowsPerPage: 10 });
  const { loading, members, fetchMembers } = useFetchMembers();

  const dataFiltered = applyFilter({
    inputData: members,
    comparator: getComparator(table.order, table.orderBy),
  });

  const { filter = defaultFilter } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IMemberPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { email: { contains: filter.search, mode: 'insensitive' } },
        { username: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    return filterObj;
  }, [filter]);

  const canReset = !!filter.search;

  const notFound = (canReset && !members?.length) || !members?.length;

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  useEffect(() => {
    fetchMembers({ variables: { filter: graphQueryFilter } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    setEmails(table.selected.map((item) => item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.onSelectRow, table.onSelectAllRows]);

  return (
    <Box border="1px solid #eeeeee" borderRadius="10px 10px 0 0">
      <Stack direction="row">
        <SearchInput search={filter.search} onSearchChange={handleSearchChange} sx={{ p: 1 }} />
      </Stack>
      <ScrollBar>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={
            dataFiltered.slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            ).length
          }
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                ?.map((row) => row.email)
            )
          }
        />
        <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: { md: 840, xs: 430 } }}>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headLabel={TABLE_HEAD}
            onSort={table.onSort}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => row.email)
              )
            }
            numSelected={table.selected.length}
            rowCount={
              loading
                ? 0
                : dataFiltered.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  ).length
            }
          />

          {loading ? (
            <TableSkeleton />
          ) : (
            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                ?.map((row) => (
                  <TableRow
                    hover
                    key={row.email}
                    onClick={() => table.onSelectRow(row.email)}
                    selected={table.selected.includes(row.email)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={table.selected.includes(row.email)} />
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}

              <TableNoData notFound={notFound} />
            </TableBody>
          )}
        </Table>
      </ScrollBar>

      <TablePaginationCustom
        page={table.page}
        dense={table.dense}
        count={members.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Box>
  );
}
type ApplyFilterProps = {
  inputData: any[];
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
