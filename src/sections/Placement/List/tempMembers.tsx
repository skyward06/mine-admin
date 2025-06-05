import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { customizeFullName } from 'src/utils/helper';
import { formatDate, formatTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { TableNoData } from 'src/components/Table';
import { ScrollBar } from 'src/components/ScrollBar';

import { useFetchPlacementTempMembers } from './useApollo';

interface Props {
  open?: UseBooleanReturn;
  onMinerChange?: (minerId: string) => void;
}

export default function TempMembers({ open, onMinerChange }: Props) {
  const router = useRouter();

  const { loading, members, fetchPlacementTempMembers } = useFetchPlacementTempMembers();

  useEffect(() => {
    fetchPlacementTempMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notFound = !members?.length;

  return (
    <ScrollBar>
      {loading ? (
        <Box>
          <Iconify
            icon="eos-icons:bubble-loading"
            style={{ display: 'block', margin: 'auto', marginTop: 50 }}
            width={40}
          />
        </Box>
      ) : (
        <Table stickyHeader size="small" sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="left">Parent</TableCell>
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
                    justifyContent: 'space-between',
                    whiteSpace: 'nowrap',
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

                  <IconButton
                    onClick={() => {
                      if (open) {
                        open.onFalse();
                      }

                      if (onMinerChange) {
                        onMinerChange(row.id);
                      }
                    }}
                  >
                    <Iconify icon="bi:diagram-2" />
                  </IconButton>
                </TableCell>

                <TableCell
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => router.push(paths.dashboard.members.edit(row.id))}
                >
                  {customizeFullName(row.fullName)}
                </TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.placementParentFullname}</TableCell>

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
      )}
    </ScrollBar>
  );
}
