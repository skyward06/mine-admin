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
import { ConfirmationStatus, type WeeklyCommission } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';

import Detail from './Detail';
import PlacementTreeView from './Placement';
import { useUpdateCommissionStatus } from '../useApollo';

// ----------------------------------------------------------------------
dayjs.extend(utcPlugin);

type Props = {
  row: WeeklyCommission;
};

export default function CommissionTableRow({ row }: Props) {
  const placementOpen = useBoolean();
  const detailOpen = useBoolean();

  const router = useRouter();

  const commission_type = ConfirmationStatus;

  const { updateCommissionStatus } = useUpdateCommissionStatus();

  const {
    id,
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
          sx={{
            alignItems: 'center',
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
            }}
          />
        </TableCell>
        <TableCell align="left">{member?.assetId}</TableCell>
        <TableCell align="left">{`L${begL}, R${begR}`}</TableCell>
        <TableCell align="left">{`L${newL}, R${newR}`}</TableCell>
        <TableCell align="left">{`L${maxL}, R${maxR}`}</TableCell>
        <TableCell align="left">{`L${endL}, R${endR}`}</TableCell>
        <TableCell align="left">
          {status !== COMMISSION_TYPE.NONE.label ? `L${pkgL}, R${pkgR}` : 'None'}
        </TableCell>
        <TableCell align="left">{commission ?? 0}</TableCell>
        <TableCell align="center">
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
          <Tooltip title="Confirm" placement="top">
            <IconButton
              color="success"
              disabled={status !== COMMISSION_TYPE.PENDING.label}
              onClick={async () => {
                const { data } = await updateCommissionStatus({
                  variables: { data: { id, status: commission_type.Paid } },
                });

                if (data) {
                  toast.message('Successfully Confirmed!');
                } else {
                  toast.message('Something went wrong!');
                }
              }}
            >
              <Iconify icon="mage:check-circle-fill" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Decline" placement="top">
            <IconButton
              color="error"
              disabled={status !== COMMISSION_TYPE.PENDING.label}
              onClick={async () => {
                const { data } = await updateCommissionStatus({
                  variables: { data: { id, status: commission_type.Declined } },
                });

                if (data) {
                  toast.message('Successfully Cancelled!');
                } else {
                  toast.message('Something went wrong!');
                }
              }}
            >
              <Iconify icon="material-symbols:cancel" />
            </IconButton>
          </Tooltip>
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
    </>
  );
}
