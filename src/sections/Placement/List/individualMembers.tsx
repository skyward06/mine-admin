import { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate, formatTime } from 'src/utils/format-time';

import { TableNoData } from 'src/components/Table';
import { ScrollBar } from 'src/components/ScrollBar';

import { useFetchIndividualMembers } from 'src/sections/Members/useApollo';

export default function IndividualMembers() {
  const router = useRouter();

  const { members, fetchIndividualMembers } = useFetchIndividualMembers();

  useEffect(() => {
    fetchIndividualMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notFound = !members?.length;

  return (
    <ScrollBar>
      <Table stickyHeader size="small" sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Full Name</TableCell>
            <TableCell align="left">Sponsor</TableCell>
            <TableCell align="left">Created At</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {members!.map((row: any) => (
            <TableRow>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
                  whiteSpace: 'nowrap',
                }}
                onClick={() => {
                  router.push(paths.dashboard.members.edit(row.id));
                }}
              >
                <ListItemText
                  primary={row.username}
                  secondary={row.email}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                  }}
                />
              </TableCell>

              <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.fullName}</TableCell>

              <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.sponsor?.username}</TableCell>

              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <ListItemText
                  primary={formatDate(row.createdAt)}
                  secondary={formatTime(row.createdAt)}
                  primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                  secondaryTypographyProps={{
                    mt: 0.5,
                    component: 'span',
                    typography: 'caption',
                  }}
                />
              </TableCell>
            </TableRow>
          ))}

          <TableNoData notFound={notFound} />
        </TableBody>
      </Table>
    </ScrollBar>
  );
}
