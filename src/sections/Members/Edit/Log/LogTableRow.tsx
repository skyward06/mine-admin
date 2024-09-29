import type { MemberLog } from 'src/__generated__/graphql';

import { useTheme } from '@mui/material/styles';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/useBoolean';

import { fDateTime } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/Iconify';

import LogDrawer from './LogDrawer';

interface Props {
  row: MemberLog;
}

export default function LogTableRow({ row }: Props) {
  const { who, role, action, when, status } = row;

  const theme = useTheme();

  const details = useBoolean();
  const open = useBoolean();

  const defaultStyles = {
    borderTop: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    borderBottom: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    '&:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderLeft: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    },
    '&:last-of-type': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderRight: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    },
  };

  return (
    <>
      <TableRow
        onClick={() => open.onTrue()}
        sx={{
          borderRadius: 1,
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: 'background.paper',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': { backgroundColor: 'background.paper', boxShadow: theme.customShadows.z20 },
            cursor: 'pointer',
          },
          [`& .${tableCellClasses.root}`]: { ...defaultStyles },
          ...(details.value && { [`& .${tableCellClasses.root}`]: { ...defaultStyles } }),
        }}
      >
        <TableCell>{who}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>{action}</TableCell>
        <TableCell>{fDateTime(when, 'MM/DD/YYYY hh:mm:ss')}</TableCell>
        <TableCell>
          {status === 'success' ? (
            <Iconify icon="ep:success-filled" color="#22C55E" />
          ) : (
            <Iconify icon="uis:times-circle" color="#B71D18" />
          )}
        </TableCell>
      </TableRow>

      <LogDrawer open={open} defaultStyles={defaultStyles} log={row} />
    </>
  );
}
