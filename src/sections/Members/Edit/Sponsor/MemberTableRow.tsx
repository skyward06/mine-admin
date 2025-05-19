import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate, formatTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  /* Todo: Update type as Member */
  row: any;
};

export default function MemberTableRow({ row }: Props) {
  const router = useRouter();

  const { id, username, email, mobile, point, fullName, createdAt } = row;

  return (
    <TableRow hover>
      <TableCell
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
        }}
        onClick={() => {
          router.push(paths.dashboard.members.edit(id));
          router.refresh();
        }}
      >
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

      <TableCell>{fullName}</TableCell>

      <TableCell>{mobile}</TableCell>

      <TableCell>{point}</TableCell>

      <TableCell>
        <ListItemText
          primary={formatDate(createdAt)}
          secondary={formatTime(createdAt)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
    </TableRow>
  );
}
