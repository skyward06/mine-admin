import type { WeeklyCommission } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { COMMISSION_TYPE } from 'src/consts';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: WeeklyCommission;
};

export default function CommissionTableRow({ row }: Props) {
  const router = useRouter();

  const {
    member,
    memberId,
    beforeLeftPoint,
    beforeRightPoint,
    afterLeftPoint,
    afterRightPoint,
    commission,
    status,
    calculatedLeftPoint,
    calculatedRightPoint,
  } = row;

  return (
    <TableRow hover>
      <TableCell
        align="left"
        onClick={() => router.push(paths.dashboard.members.edit(member?.id ?? ''))}
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
      <TableCell align="left">{`L${beforeLeftPoint}, R${beforeRightPoint}`}</TableCell>
      <TableCell align="left">
        {status !== COMMISSION_TYPE.NONE
          ? `L${calculatedLeftPoint}, R${calculatedRightPoint}`
          : 'None'}
      </TableCell>
      <TableCell align="left">{commission ?? 0}</TableCell>
      <TableCell align="left">{`L${afterLeftPoint}, R${afterRightPoint}`}</TableCell>
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
