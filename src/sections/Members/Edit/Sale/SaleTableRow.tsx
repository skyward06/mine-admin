import type { Sale } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { fDate, fTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  row: Sale;
};

export default function SaleTableRow({ row }: Props) {
  const { id, member, package: product, paymentMethod, orderedAt } = row;

  const handleClickSale = () => {
    window.open(`${paths.dashboard.sales.edit(id)}`, '_blank');
  };

  return (
    <TableRow
      hover
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => handleClickSale()}
    >
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
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
    </TableRow>
  );
}
