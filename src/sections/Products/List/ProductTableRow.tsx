import type { Package } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: Package;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function ProductTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();

  const {
    id,
    amount,
    date,
    productName,
    isFreeShare,
    point,
    freePeriodFrom,
    freePeriodTo,
    token,
    sales,
  } = row;

  return (
    <TableRow hover>
      <TableCell align="left">{formatDate(date)}</TableCell>
      <TableCell align="left">{amount}</TableCell>
      <TableCell align="left">{productName}</TableCell>
      <TableCell align="left">
        {isFreeShare ? (
          <Label variant="soft" color="primary">
            Free
          </Label>
        ) : (
          <Label variant="soft" color="success">
            Premium
          </Label>
        )}
      </TableCell>
      <TableCell align="left">
        {isFreeShare && (
          <ListItemText
            primary={formatDate(freePeriodFrom)}
            primaryTypographyProps={{ typography: 'caption', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        )}
      </TableCell>
      <TableCell align="left">
        <ListItemText
          primary={formatDate(freePeriodTo)}
          primaryTypographyProps={{ typography: 'caption', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell align="left">{point}</TableCell>
      <TableCell align="left">{token}</TableCell>
      <TableCell align="center">
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton
            onClick={() => {
              router.push(`${paths.dashboard.products.edit(id)}`);
            }}
          >
            <Iconify icon="solar:pen-2-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top" arrow>
          <IconButton
            color="error"
            disabled={!!sales?.length}
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
