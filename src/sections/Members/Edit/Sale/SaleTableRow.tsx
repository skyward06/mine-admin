import type { Sale } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: Sale;
};

export default function SaleTableRow({ row }: Props) {
  const open = useBoolean();

  const { ID, member, package: product, paymentMethod, orderedAt } = row;

  const handleClickSale = () => {
    window.open(`${paths.dashboard.sales.edit(formatID(ID, 'S'))}`, '_blank');
  };

  return (
    <>
      <TableRow
        hover
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => handleClickSale()}
      >
        <TableCell align="left">{formatID(ID, 'S')}</TableCell>
        <TableCell align="left">{member?.assetId}</TableCell>
        <TableCell align="left">{product?.productName}</TableCell>
        <TableCell align="left">{paymentMethod}</TableCell>
        <TableCell align="left">{product?.amount}</TableCell>
        <TableCell align="left">{product?.token}</TableCell>
        <TableCell align="left">
          <ListItemText
            primary={formatDate(orderedAt)}
            primaryTypographyProps={{ typography: 'caption', noWrap: true }}
            secondaryTypographyProps={{
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title="View" placement="top" arrow>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                open.onTrue();
              }}
            >
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* <Detail open={open} row={row} /> */}
    </>
  );
}
