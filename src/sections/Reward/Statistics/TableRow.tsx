import type { MemberStatistics } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { formatDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  row: MemberStatistics;
};

export default function MemberStatisticsTableRow({ row }: Props) {
  const { issuedAt, member, hashPower, txcShared, percent } = row;
  return (
    <TableRow hover>
      <TableCell>{formatDate(issuedAt)}</TableCell>
      <TableCell>{member?.username}</TableCell>
      <TableCell>{hashPower}</TableCell>
      <TableCell>{txcShared / 10 ** 8}</TableCell>
      <TableCell>{percent / 100} %</TableCell>
    </TableRow>
  );
}
