import type { Proof } from 'src/__generated__/graphql';

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { FileThumbnail } from 'src/components/FileThumbnail';

import Detail from './Detail';
import { PROOF_VALUES } from '../EditForm';

import type { PROOF_KEY_VALUE_TYPE } from '../EditForm';

// ----------------------------------------------------------------------

type Props = {
  row: Proof;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function ProductTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();
  const open = useBoolean();

  const { id, amount, createdAt, orderedAt, type, refId, files } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{formatDate(createdAt)}</TableCell>
        <TableCell align="left">{formatDate(orderedAt)}</TableCell>
        <TableCell align="left">{amount}</TableCell>
        <TableCell align="left">{refId}</TableCell>
        <TableCell align="left">
          {PROOF_VALUES[type as PROOF_KEY_VALUE_TYPE].split(':').pop()}
        </TableCell>
        <TableCell align="left">
          <Stack direction="row">
            {!!files?.length && <FileThumbnail file="png" sx={{ width: 24 }} />}
            <Typography sx={{ p: 1 }}>
              {!!files?.length && `${files.length} file${files.length > 1 ? 's' : ''}`}
            </Typography>
          </Stack>
        </TableCell>
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
