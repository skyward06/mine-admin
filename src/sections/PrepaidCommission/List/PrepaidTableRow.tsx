import type { PrepaidCommission } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: PrepaidCommission;
};

export default function ProductTableRow({ row }: Props) {
  const router = useRouter();

  const { id, member, commission, pkgL, pkgR, orderedAt } = row;

  return (
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
          primary={member?.username}
          secondary={member?.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>
      <TableCell align="left">{commission}</TableCell>
      <TableCell align="left">{`L${pkgL}, R${pkgR}`}</TableCell>
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
      </TableCell>
    </TableRow>
  );
}
