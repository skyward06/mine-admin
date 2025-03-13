import type { Member } from 'src/__generated__/graphql';

import { useEffect } from 'react';
import { useParams } from 'react-router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import { tableCellClasses } from '@mui/material/TableCell';

import { ScrollBar } from 'src/components/ScrollBar';
import { TableNoData, TableSkeleton, TableHeadCustom } from 'src/components/Table';

import LogTableRow from './LogTableRow';
import { useFetchMembers } from '../../useApollo';

const TABLE_HEAD = [
  { id: 'who', label: 'Actor', sortable: false },
  { id: 'role', label: 'Role', sortable: false },
  { id: 'action', label: 'Action', sortable: false },
  { id: 'when', label: 'Time', sortable: false },
  { id: 'status', label: 'Status', sortable: false },
];

interface Props {
  currentMember: Member;
}

export default function LogView({ currentMember }: Props) {
  const theme = useTheme();
  const params = useParams();

  const { id } = params;

  const { loading, fetchMembers, members } = useFetchMembers();

  const member = members[0];

  const notFound = !member?.logs?.length;

  useEffect(() => {
    fetchMembers({ variables: { filter: { id: currentMember.id } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
      <ScrollBar>
        <Table
          size="small"
          sx={{ minWidth: 960, borderCollapse: 'separate', borderSpacing: '0 4px' }}
        >
          <TableHeadCustom
            headLabel={TABLE_HEAD}
            rowCount={loading ? 0 : member?.logs!.length}
            sx={{
              [`& .${tableCellClasses.head}`]: {
                '&:first-of-type': { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                '&:last-of-type': { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
              },
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
              {member?.logs!.map((row) => <LogTableRow key={row!.id} row={row!} />)}

              <TableNoData
                notFound={notFound}
                sx={{
                  m: -2,
                  mt: -1,
                  borderRadius: 1,
                  border: `dashed 1px ${theme.vars.palette.divider}`,
                }}
              />
            </TableBody>
          )}
        </Table>
      </ScrollBar>
    </TableContainer>
  );
}
