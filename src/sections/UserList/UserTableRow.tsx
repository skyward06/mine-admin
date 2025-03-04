import type { Admin } from 'src/__generated__/graphql';

import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate, formatTime, formatDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/Label';
import UserItem from 'src/components/UserItem';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';

import { useUpdatePasswordByAdmin } from './useApollo';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Admin;
  onSelectRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,

  onSelectRow,
}: Props) {
  const router = useRouter();
  const confirm = useBoolean();
  const password = useBoolean();
  const [newPassword, setNewPassword] = useState<any>();

  const { id, username, email, avatar, role, createdAt, updatedAt, deletedAt } = row;

  const { loading, updatePasswordByAdmin } = useUpdatePasswordByAdmin();

  const resetContent = (
    <Paper sx={{ py: 2 }}>
      <TextField
        variant="outlined"
        type={password.value ? 'text' : 'password'}
        fullWidth
        label="New Password"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="solar:user-rounded-bold" width={24} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  width={24}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );

  return (
    <>
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
            router.push(paths.dashboard.user.edit(id));
          }}
        >
          <UserItem user={{ username, email, avatar }} />
        </TableCell>

        <TableCell>
          <Label variant="soft" color="error">
            {role?.name}
          </Label>
        </TableCell>

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
        <TableCell>
          <ListItemText
            primary={formatDate(updatedAt)}
            secondary={formatTime(updatedAt)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          {deletedAt ? (
            <Tooltip title={`Deactivated at ${formatDateTime(deletedAt)}`} placement="top" arrow>
              <Label variant="soft" color="error">
                Inactive
              </Label>
            </Tooltip>
          ) : (
            <Label variant="soft" color="success">
              Active
            </Label>
          )}
        </TableCell>

        <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              color="default"
              onClick={() => {
                router.push(paths.dashboard.user.edit(id));
              }}
            >
              <Iconify icon="solar:pen-2-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Password" placement="top" arrow>
            <IconButton color="default" onClick={confirm.onTrue}>
              <Iconify icon="basil:unlock-solid" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Reset Password"
        content={resetContent}
        action={
          <LoadingButton
            variant="contained"
            color="info"
            loading={loading}
            onClick={async () => {
              try {
                await updatePasswordByAdmin({ variables: { data: { id, newPassword } } });

                toast.success('password updated successfully!');

                confirm.onFalse();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            OK
          </LoadingButton>
        }
      />
    </>
  );
}
