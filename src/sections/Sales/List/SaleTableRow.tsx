import type { Sale } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate, fTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: Sale;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function SaleTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();

  const {
    id,
    invoiceNo,
    member,
    package: product,
    paymentMethod,
    orderedAt,
    statisticsSales,
  } = row;

  return (
    <TableRow hover>
      <TableCell>{invoiceNo}</TableCell>
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
      <TableCell align="left">{member?.mobile}</TableCell>
      <TableCell align="left">{member?.assetId}</TableCell>
      <TableCell align="left">{product?.productName}</TableCell>
      <TableCell align="left">{paymentMethod}</TableCell>
      <TableCell align="left">{product?.amount}</TableCell>
      <TableCell align="left">{product?.token}</TableCell>
      <TableCell align="left">
        <ListItemText
          primary={fDate(orderedAt)}
          secondary={fTime(orderedAt)}
          primaryTypographyProps={{ typography: 'caption', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton
            onClick={() => {
              router.push(`${paths.dashboard.sales.edit(id)}`);
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
  );
}
