import dayjs from 'dayjs';

import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { COMMISSION_TYPE } from 'src/consts';
import { Confirmation4Status, type WeeklyCommission } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';

import PlacementTreeView from './Placement';
import { useUpdateCommissionStatus } from '../useApollo';

// ----------------------------------------------------------------------

type Props = {
  row: WeeklyCommission;
};

export default function CommissionTableRow({ row }: Props) {
  const open = useBoolean();

  const router = useRouter();

  const commission_type = Confirmation4Status;

  const { updateCommissionStatus } = useUpdateCommissionStatus();

  const {
    id,
    member,
    status,
    memberId,
    beforeLeftPoint,
    beforeRightPoint,
    afterLeftPoint,
    afterRightPoint,
    commission,
    weekStartDate,
    calculatedLeftPoint,
    calculatedRightPoint,
  } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="left">
          <ListItemText
            primary={`week #${dayjs(weekStartDate).format('ww')}`}
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
        <TableCell align="left">{`L${calculatedLeftPoint}, R${calculatedRightPoint}`}</TableCell>
        <TableCell align="left">{commission}</TableCell>
        <TableCell align="left">{`L${afterLeftPoint}, R${afterRightPoint}`}</TableCell>
        <TableCell align="center">
          <Tooltip title="Placement" placement="top" arrow>
            <IconButton color="default" onClick={() => open.onTrue()}>
              <Iconify icon="clarity:flow-chart-line" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" placement="top" arrow>
            <IconButton
              color="default"
              onClick={() => router.push(paths.dashboard.members.edit(memberId))}
            >
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Confirm" placement="top">
            <IconButton
              color="success"
              disabled={status !== COMMISSION_TYPE.PENDING}
              onClick={async () => {
                const { data } = await updateCommissionStatus({
                  variables: { data: { id, status: commission_type.Confirm } },
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
              disabled={status !== COMMISSION_TYPE.PENDING}
              onClick={async () => {
                const { data } = await updateCommissionStatus({
                  variables: { data: { id, status: commission_type.Block } },
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

      <Dialog fullWidth maxWidth={false} open={open.value} onClose={() => open.onFalse()}>
        <PlacementTreeView memberId={member?.id} weekStartDate={weekStartDate} />
      </Dialog>
    </>
  );
}
