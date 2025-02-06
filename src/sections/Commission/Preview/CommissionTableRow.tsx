import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatWeekNumber } from 'src/utils/format-time';

import { COMMISSION_TYPE } from 'src/consts';
import { type WeeklyCommission } from 'src/__generated__/graphql';

import { Iconify } from 'src/components/Iconify';

import Detail from './Detail';
import PlacementTreeView from '../Member/Placement';

// ----------------------------------------------------------------------
dayjs.extend(utcPlugin);

type Props = {
  row: WeeklyCommission;
};

export default function CommissionTableRow({ row }: Props) {
  const noteOpen = useBoolean();
  const placementOpen = useBoolean();

  const router = useRouter();

  const {
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
    member,
    status,
    shortNote,
    commission,
    weekStartDate,
  } = row;

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
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
          sx={{
            alignItems: 'center',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
          onClick={() => router.push(paths.dashboard.members.edit(member?.id ?? ''))}
        >
          <ListItemText
            primary={member?.username}
            secondary={member?.email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
          {member?.assetId}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${begL}, R${begR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${newL}, R${newR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${maxL}, R${maxR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${endL}, R${endR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
          {status !== COMMISSION_TYPE.NONE.label ? `L${pkgL}, R${pkgR}` : 'None'}
        </TableCell>
        <TableCell align="left">{commission ?? 0}</TableCell>
        <TableCell
          align="left"
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {shortNote}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
          <Tooltip title="Placement" placement="top" arrow>
            <IconButton color="default" onClick={() => placementOpen.onTrue()}>
              <Iconify icon="clarity:flow-chart-line" />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Prepay" placement="top" arrow>
            <IconButton
              color="default"
              onClick={() => navigate(paths.dashboard.prepaidCommission.new, { state })}
            >
              <Iconify icon="f7:money-dollar-circle-fill" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="View" placement="top" arrow>
            <IconButton color="default" onClick={noteOpen.onTrue}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Detail open={noteOpen} row={row} />

      <Dialog
        fullWidth
        maxWidth={false}
        open={placementOpen.value}
        onClose={() => placementOpen.onFalse()}
      >
        <PlacementTreeView memberId={member?.id} weekStartDate={weekStartDate} />
      </Dialog>
    </>
  );
}
