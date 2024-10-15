import type { WeeklyCommissionStatus } from 'src/__generated__/graphql';

import dayjs from 'dayjs';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: WeeklyCommissionStatus;
};

export default function CommissionTableRow({ row }: Props) {
  const router = useRouter();

  const {
    member,
    memberId,
    weekStartDate,
    beforeLeftPoint,
    beforeRightPoint,
    afterLeftPoint,
    afterRightPoint,
    weeklyCommission,
  } = row;

  return (
    <TableRow hover>
      <TableCell align="left">
        <ListItemText
          primary={`Week - ${dayjs(weekStartDate).format('ww')}`}
          secondary={`${dayjs(weekStartDate).add(1, 'day').format('MM/DD')} - ${dayjs(weekStartDate).add(7, 'day').format('MM/DD')}`}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>
      <TableCell
        align="left"
        onClick={() => router.push(paths.dashboard.members.edit(member?.id ?? ''))}
      >
        <ListItemText
          primary={member?.username}
          secondary={member?.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>
      <TableCell align="left">{`L${beforeLeftPoint}, R${beforeRightPoint}`}</TableCell>
      <TableCell align="left">
        {weeklyCommission
          ? `L${weeklyCommission?.calculatedLeftPoint}, R${weeklyCommission?.calculatedRightPoint}`
          : 'None'}
      </TableCell>
      <TableCell align="left">{weeklyCommission?.commission ?? 0}</TableCell>
      <TableCell align="left">{`L${afterLeftPoint}, R${afterRightPoint}`}</TableCell>
      <TableCell align="center">
        <Tooltip title="View" placement="top" arrow>
          <IconButton
            color="default"
            onClick={() => router.push(paths.dashboard.members.edit(memberId))}
          >
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
