import type { EntityLog } from 'src/__generated__/graphql';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/useBoolean';

import { customizeFullName } from 'src/utils/helper';
import { formatDateTime } from 'src/utils/format-time';

import { LOG_LABEL } from 'src/consts';
import { varAlpha } from 'src/theme/styles';

import LogDrawer from '../Members/Edit/Log/LogDrawer';

interface Props {
  row: EntityLog;
}

export default function LogTableRow({ row }: Props) {
  const { who, role, status, action, when, after } = row;

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
    padding: '4px 16px',
  };

  return (
    <>
      <TableRow
        onClick={open.onTrue}
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
        <TableCell sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} width={{ xs: 1, md: 1, lg: 0.5 }}>
            <Typography variant="body2" fontWeight={600}>
              {who}
            </Typography>
            <Typography variant="body2">
              ({role}) has {LOG_LABEL.status[status as keyof typeof LOG_LABEL.status]}{' '}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {LOG_LABEL.action[action as keyof typeof LOG_LABEL.action]}.
            </Typography>
            {(action === 'create' || 'update' || 'remove') && (
              <Typography>{customizeFullName(after?.fullName ?? '')}</Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={4} width={1}>
            <Typography variant="body2">{after?.ip && `IP: ${after?.ip}`}</Typography>
            <Typography variant="body2">
              {after?.userAgent && `Device: ${after?.userAgent.device}`}
            </Typography>
          </Stack>

          <Stack width={{ xs: 0.5, md: 0.5, lg: 0.3 }} direction="row" justifyContent="flex-end">
            <Typography variant="body2">{formatDateTime(when)}</Typography>
          </Stack>
        </TableCell>
      </TableRow>

      <LogDrawer open={open} log={row} />
    </>
  );
}
