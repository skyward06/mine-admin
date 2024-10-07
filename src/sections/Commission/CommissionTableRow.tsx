import type { WeeklyCommission } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  row: WeeklyCommission;
};

export default function CommissionTableRow({ row }: Props) {
  const router = useRouter();

  const { leftPoint, rightPoint, commission, member, createdAt, weekStartDate } = row;

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
      <TableCell align="left">{leftPoint}</TableCell>
      <TableCell align="left">{rightPoint}</TableCell>
      <TableCell align="left">{commission}</TableCell>
      <TableCell align="left">{formatDate(createdAt)}</TableCell>
      <TableCell align="left">{formatDate(weekStartDate)}</TableCell>
    </TableRow>
  );
}
