import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import {
  useTable,
  TableNoData,
  getComparator,
  TableSkeleton,
  TableHeadCustom,
} from 'src/components/Table';

import { useFetchMemberList } from '../useApollo';

interface Props {
  handleRemove: Function;
}

const TABLE_HEAD = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'createdAt', label: 'Created At', sortable: true },
  { id: 'actions', label: 'Action', sortable: false },
];

export default function MemberListTable({ handleRemove }: Props) {
  const table = useTable({ defaultDense: true });
  const { loading, memberList, fetchMemberList } = useFetchMemberList();

  const dataFiltered = applyFilter({
    inputData: memberList,
    comparator: getComparator(table.order, table.orderBy),
  });

  const notFound = !memberList?.length;

  useEffect(() => {
    fetchMemberList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box border="1px solid #eeeeee" borderRadius="10px 10px 0 0">
      <ScrollBar>
        <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: { md: 840, xs: 430 } }}>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headLabel={TABLE_HEAD}
            onSort={table.onSort}
            rowCount={loading ? 0 : dataFiltered?.length}
          />

          {loading ? (
            <TableSkeleton />
          ) : (
            <TableBody>
              {dataFiltered?.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleRemove(row.id)}>
                      <Iconify icon="bxs:coffee-togo" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              <TableNoData notFound={notFound} />
            </TableBody>
          )}
        </Table>
      </ScrollBar>
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
