import type { Member } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate, fTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Member;
  action?: boolean;
  onSelectRow: VoidFunction;
};

export default function MemberTableRow({ row, selected, action = true, onSelectRow }: Props) {
  const router = useRouter();

  const { id, username, email, mobile, primaryAddress, assetId, payout, wallet, createdAt } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
        }}
        onClick={() => {
          router.push(paths.dashboard.members.edit(id));
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

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{mobile}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{primaryAddress}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{assetId}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{payout.display}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{wallet}</TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(createdAt)}
          secondary={fTime(createdAt)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      {action && (
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="View" placement="top" arrow>
            <IconButton
              color="default"
              onClick={() => {
                router.push(`${paths.dashboard.members.edit(id)}`);
              }}
            >
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
}
