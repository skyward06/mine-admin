import type { WeeklyCommission } from 'src/__generated__/graphql';

import dayjs from 'dayjs';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatWeekNumber } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import Detail from 'src/sections/Commission/Member/Detail';

// ----------------------------------------------------------------------

type Props = {
  row: WeeklyCommission;
};

export default function CommissionTableRow({ row }: Props) {
  const router = useRouter();

  const open = useBoolean();

  const {
    member,
    begL,
    begR,
    newL,
    newR,
    maxL,
    maxR,
    endL,
    endR,
    pkgL,
    pkgR,
    commission,
    weekStartDate,
  } = row;

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
        <TableCell align="left">{`L${begL}, R${begR}`}</TableCell>
        <TableCell align="left">{`L${newL}, R${newR}`}</TableCell>
        <TableCell align="left">{`L${maxL}, R${maxR}`}</TableCell>
        <TableCell align="left">{`L${pkgL}, R${pkgR}`}</TableCell>
        <TableCell align="left">{`L${endL}, R${endR}`}</TableCell>
        <TableCell align="left">{commission ?? 0}</TableCell>
        <TableCell align="center">
          <Tooltip title="View" placement="top" arrow>
            <IconButton color="default" onClick={() => open.onTrue()}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <Detail open={open} row={row} />
    </>
  );
}
