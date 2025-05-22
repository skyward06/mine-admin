import type { BasicWeeklyCommission } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { customizeFullName } from 'src/utils/helper';

import { COMMISSION_TYPE } from 'src/consts';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: BasicWeeklyCommission;
};

export default function CommissionTableRow({ row }: Props) {
  const router = useRouter();

  const {
    begL,
    begR,
    newL,
    newR,
    maxL,
    maxR,
    endL,
    endR,
    pkgL,
    pkgR,
    email,
    status,
    username,
    fullName,
    memberId,
    commission,
  } = row;

  return (
    <TableRow hover>
      <TableCell align="left" onClick={() => router.push(paths.dashboard.members.edit(memberId))}>
        <ListItemText
          primary={username}
          secondary={email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>
      <TableCell align="left">{customizeFullName(fullName)}</TableCell>
      <TableCell align="left">{`L${begL}, R${begR}`}</TableCell>
      <TableCell align="left">{`L${newL}, R${newR}`}</TableCell>
      <TableCell align="left">{`L${maxL}, R${maxR}`}</TableCell>
      <TableCell align="left">{`L${endL}, R${endR}`}</TableCell>
      <TableCell align="left">
        {status !== COMMISSION_TYPE.NONE.label ? `L${pkgL}, R${pkgR}` : 'None'}
      </TableCell>
      <TableCell align="left">{commission ?? 0}</TableCell>
      <TableCell align="center">
        <Tooltip title="View" placement="top" arrow>
          <IconButton
            color="default"
            onClick={() => router.push(paths.dashboard.members.edit(memberId))}
          >
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
