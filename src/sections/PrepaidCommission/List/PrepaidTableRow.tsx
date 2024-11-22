import type { PrepaidCommission } from 'src/__generated__/graphql';

import dayjs from 'dayjs';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import Detail from './Detail';

// ----------------------------------------------------------------------

type Props = {
  row: PrepaidCommission;
  removeConfirm: UseBooleanReturn;
  setSelected: Function;
};

export default function ProductTableRow({ row, removeConfirm, setSelected }: Props) {
  const router = useRouter();
  const open = useBoolean();

  const { id, commission, orderedAt } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{formatDate(orderedAt)}</TableCell>
        <TableCell
          align="left"
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
          onClick={() => {
            router.push(paths.dashboard.members.edit(id));
          }}
        >
          <ListItemText
            primary={commission?.member?.username}
            secondary={commission?.member?.email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell align="left">{commission?.commission}</TableCell>
        <TableCell align="left">{`L${commission?.pkgL}, R${commission?.pkgR}`}</TableCell>
        <TableCell align="left">
          <ListItemText
            primary={`${dayjs(commission?.weekStartDate).add(1, 'day').format('MM/DD')} - ${dayjs(commission?.weekStartDate).add(7, 'day').format('MM/DD')}`}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              color="primary"
              onClick={() => {
                router.push(`${paths.dashboard.prepaidCommission.edit(id)}`);
              }}
            >
              <Iconify icon="solar:pen-2-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" placement="top" arrow>
            <IconButton onClick={() => open.onTrue()}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color="error"
              onClick={() => {
                removeConfirm.onTrue();
                setSelected(id);
              }}
            >
              <Iconify icon="bxs:coffee-togo" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Detail row={row} open={open} />
    </>
  );
}
