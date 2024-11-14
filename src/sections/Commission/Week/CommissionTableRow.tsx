import type { CommissionOverview } from 'src/__generated__/graphql';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate, formatWeekNumber } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import PlacementTreeView from './Placement';

// ----------------------------------------------------------------------
dayjs.extend(utcPlugin);

type Props = {
  row: CommissionOverview;
};

export default function CommissionTableRow({ row }: Props) {
  const { totalAmount, totalMember, totalSale, weekStartDate } = row;

  const open = useBoolean();

  return (
    <>
      <TableRow hover>
        <TableCell align="left">
          <ListItemText
            primary={`week #${formatWeekNumber(weekStartDate)}`}
            secondary={`${dayjs(weekStartDate).utc().format('MM/DD')} - ${dayjs(weekStartDate).utc().add(6, 'day').format('MM/DD')}`}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell align="left">{totalSale}</TableCell>
        <TableCell align="left">{totalMember}</TableCell>
        <TableCell align="left">{totalAmount}</TableCell>
        <TableCell align="center">
          <Tooltip title="Placement" placement="top" arrow>
            <IconButton color="default" onClick={() => open.onTrue()}>
              <Iconify icon="clarity:flow-chart-line" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" placement="top" arrow>
            <IconButton
              color="default"
              onClick={() =>
                window.open(
                  paths.dashboard.commission.detail(formatDate(weekStartDate, 'YYYY-MM-DD')),
                  '_blank'
                )
              }
            >
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Dialog fullWidth maxWidth={false} open={open.value} onClose={() => open.onFalse()}>
        <PlacementTreeView weekStartDate={weekStartDate} />
      </Dialog>
    </>
  );
}
