import type { AdminNotes } from 'src/__generated__/graphql';

import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import EditForm from './EditForm';

// ----------------------------------------------------------------------

type Props = {
  row: AdminNotes;
  memberId: string;
  setSelected: Function;
  confirm: UseBooleanReturn;
};

export default function ProductTableRow({ row, confirm, memberId, setSelected }: Props) {
  const open = useBoolean();
  const { id, admin, createdAt, description } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{formatDate(createdAt)}</TableCell>
        <TableCell align="left">{admin?.username}</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="center">
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton color="primary" onClick={open.onTrue}>
              <Iconify icon="solar:pen-2-bold" />
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

      <Drawer
        open={open.value}
        onClose={() => open.onFalse()}
        anchor="right"
        PaperProps={{ sx: { width: 550, background: '#fff' } }}
      >
        <EditForm open={open} memberId={memberId} current={row} />
      </Drawer>
    </>
  );
}
