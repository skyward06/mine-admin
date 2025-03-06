import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { formatWeekNumber } from 'src/utils/format-time';

import { PERMISSIONS, COMMISSION_TYPE } from 'src/consts';
import { ConfirmationStatus, type WeeklyCommission } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useAuthContext } from 'src/auth/hooks';

import Detail from './Detail';
import PlacementTreeView from './Placement';
import { useUpdateCommission } from '../useApollo';

// ----------------------------------------------------------------------
dayjs.extend(utcPlugin);

type Props = {
  row: WeeklyCommission;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function CommissionTableRow({ row, selected, onSelectRow }: Props) {
  const placementOpen = useBoolean();
  const detailOpen = useBoolean();

  const router = useRouter();

  const popover = usePopover();

  const { user } = useAuthContext();

  const commission_type = ConfirmationStatus;

  const { updateCommission } = useUpdateCommission();

  const {
    id,
    ID,
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
    proof,
    member,
    status,
    commission,
    weekStartDate,
  } = row;

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ whiteSpace: 'nowrap' }} padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
          {formatID(ID, 'C')}
        </TableCell>
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
          {member?.fullName}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
          {member?.username}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${begL}, R${begR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${newL}, R${newR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${maxL}, R${maxR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
          {status !== COMMISSION_TYPE.NONE.label ? `L${pkgL}, R${pkgR}` : 'None'}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">{`L${endL}, R${endR}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
          {commission ?? 0}
        </TableCell>
        <TableCell align="left">{member?.commissionDefault}</TableCell>
        <TableCell align="left">{proof?.note}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
          <Tooltip title="Placement" placement="top" arrow>
            <IconButton color="default" onClick={() => placementOpen.onTrue()}>
              <Iconify icon="clarity:flow-chart-line" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" placement="top" arrow>
            <IconButton color="default" onClick={() => detailOpen.onTrue()}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          {user?.role?.commission !== PERMISSIONS.VIEWER_PERMISSION.value && (
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="nrk:more" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Dialog
        fullWidth
        maxWidth={false}
        open={placementOpen.value}
        onClose={() => placementOpen.onFalse()}
      >
        <PlacementTreeView memberId={member?.id} weekStartDate={weekStartDate} />
      </Dialog>

      <Detail open={detailOpen} row={row} />

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-center' } }}
      >
        <MenuList>
          <MenuItem
            sx={{ color: 'secondary.main' }}
            disabled={status !== COMMISSION_TYPE.PENDING.label}
            onClick={async () => {
              const { data } = await updateCommission({
                variables: { data: { id, status: commission_type.Approved } },
              });

              if (data) {
                toast.message('Successfully Approved!');
              } else {
                toast.message('Something went wrong!');
              }
            }}
          >
            <Iconify icon="mage:check-circle-fill" />
            Approve
          </MenuItem>
          <MenuItem
            sx={{ color: 'error.main' }}
            disabled={status !== COMMISSION_TYPE.PENDING.label}
            onClick={async () => {
              const { data } = await updateCommission({
                variables: { data: { id, status: commission_type.Declined } },
              });

              if (data) {
                toast.message('Successfully Declined!');
              } else {
                toast.message('Something went wrong!');
              }
            }}
          >
            <Iconify icon="material-symbols:cancel" />
            Decline
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
