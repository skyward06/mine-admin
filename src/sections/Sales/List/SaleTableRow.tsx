import type { Sale } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import Detail from './Detail';

// ----------------------------------------------------------------------

type Props = {
  row: Sale;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function SaleTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();
  const open = useBoolean();

  const { id, ID, member, package: product, paymentMethod, orderedAt, statisticsSales } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{formatID(ID, 'S')}</TableCell>
        <TableCell
          align="left"
          sx={{
            cursor: 'pointer',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
          onClick={() => {
            router.push(paths.dashboard.members.edit(member?.id ?? ''));
          }}
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
        <TableCell align="left">{product?.productName}</TableCell>
        <TableCell align="left">{paymentMethod}</TableCell>
        <TableCell align="left">{product?.amount}</TableCell>
        <TableCell align="left">{product?.token}</TableCell>
        <TableCell align="left">{product?.point}</TableCell>
        <TableCell align="left">
          <ListItemText
            primary={formatDate(orderedAt)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title="View" placement="top" arrow>
            <IconButton onClick={() => open.onTrue()}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              onClick={() => {
                router.push(`${paths.dashboard.sales.edit(formatID(ID))}`);
              }}
            >
              <Iconify icon="solar:pen-2-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color="error"
              disabled={!!statisticsSales?.length}
              onClick={() => {
                confirm.onTrue();
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
