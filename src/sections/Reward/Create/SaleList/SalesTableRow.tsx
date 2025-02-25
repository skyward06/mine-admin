import type { BasicSale } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Label } from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  // row: Sale;
  row: BasicSale;
  onSelectRow: VoidFunction;
};

export default function SalesTableRow({ row, selected, onSelectRow }: Props) {
  const router = useRouter();

  const { id, productName, amount, token, assetId, username, paymentMethod, status } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
        }}
        onClick={() => {
          router.push(paths.dashboard.members.edit(id));
        }}
      >
        {username}
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{productName}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{paymentMethod}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{amount}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{token}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{assetId}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {status ? (
          <Label variant="soft" color="success">
            Active
          </Label>
        ) : (
          <Label variant="soft" color="error">
            Inactive
          </Label>
        )}
      </TableCell>
    </TableRow>
  );
}
