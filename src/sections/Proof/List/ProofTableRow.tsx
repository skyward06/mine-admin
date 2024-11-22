import type { Proof } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import Detail from './Detail';

// ----------------------------------------------------------------------

type Props = {
  row: Proof;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function ProductTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();
  const open = useBoolean();

  const { id, amount, createdAt, type, refId } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{formatDate(createdAt)}</TableCell>
        <TableCell align="left">{amount}</TableCell>
        <TableCell align="left">{refId}</TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="center">
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              color="primary"
              onClick={() => {
                router.push(`${paths.dashboard.proof.edit(id)}`);
              }}
            >
              <Iconify icon="solar:pen-2-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" placement="top" arrow>
            <IconButton color="default" onClick={() => open.onTrue()}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color="error"
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

      <Detail open={open} row={row} />
    </>
  );
}
