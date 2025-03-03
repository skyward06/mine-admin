import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatID } from 'src/utils/helper';

import UserItem from 'src/components/UserItem';

import type { Sponsor } from '../type';

// ----------------------------------------------------------------------
dayjs.extend(utcPlugin);

type Props = {
  row: Sponsor;
};

export default function SponsorTableRow({ row }: Props) {
  const router = useRouter();
  const { id, ID, username, email, fullName, weekIntroducers } = row;

  return (
    <TableRow hover>
      <TableCell>{formatID(ID ?? '')}</TableCell>
      <TableCell
        sx={{
          alignItems: 'center',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
        }}
        onClick={() => {
          router.push(paths.dashboard.members.edit(id));
        }}
      >
        <UserItem user={{ username, email }} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
        {fullName}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
        {weekIntroducers}
      </TableCell>
    </TableRow>
  );
}
