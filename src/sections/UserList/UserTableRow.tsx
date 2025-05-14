import { useState } from 'react';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate, formatTime } from 'src/utils/format-time';

import { ADMIN_STATUS } from 'src/consts';
import { type Admin, AdminStatus } from 'src/__generated__/graphql';

import { Label } from 'src/components/Label';
import UserItem from 'src/components/UserItem';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useRemoveAdmin, useUpdateAdmin, useUpdatePasswordByAdmin } from './useApollo';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Admin;
};

export default function UserTableRow({ row, selected }: Props) {
  const router = useRouter();
  const popover = usePopover();

  const confirm = useBoolean();
  const password = useBoolean();
  const removeConfirm = useBoolean();

  const [newPassword, setNewPassword] = useState<any>();

  const { id, username, email, status, avatar, role, createdAt, updatedAt } = row;

  const { loading: updateLoading, updateAdmin } = useUpdateAdmin();
  const { loading: removeLoading, removeAdmin } = useRemoveAdmin();
  const { loading, updatePasswordByAdmin } = useUpdatePasswordByAdmin();

  const handleRemoveAdmin = async () => {
    try {
      const { data } = await removeAdmin({ variables: { data: { id } } });

      if (data?.removeAdmin.result === 'success') {
        toast.error('Successfully removed!');
        removeConfirm.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeStatus = async () => {
    try {
      const { data } = await updateAdmin({
        variables: {
          data: {
            id,
            status: status === AdminStatus.Enabled ? AdminStatus.Disabled : AdminStatus.Enabled,
          },
        },
      });

      if (data) {
        toast.success('Successfully Changed!');
        popover.onClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          <Label variant="soft" color={status === AdminStatus.Enabled ? 'success' : 'error'}>
            {ADMIN_STATUS[status]}
          </Label>
        </TableCell>

        <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-horizontal-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push(paths.dashboard.user.edit(id));
            }}
          >
            <Iconify icon="solar:pen-2-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleChangeStatus}>
            <Iconify icon="fluent-mdl2:sync-status-solid" />
            {status === AdminStatus.Enabled ? 'Disable' : 'Enable'}
            {updateLoading && <Iconify icon="eos-icons:bubble-loading" />}
          </MenuItem>

          <MenuItem onClick={confirm.onTrue}>
            <Iconify icon="basil:unlock-solid" />
            Reset Password
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              removeConfirm.onTrue();
            }}
          >
            <Iconify icon="solar:trash-bin-minimalistic-bold" color="red" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

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
                toast.error(err.message);
              }
            }}
          >
            OK
          </LoadingButton>
        }
      />

      <ConfirmDialog
        open={removeConfirm.value}
        onClose={removeConfirm.onFalse}
        title="Delete"
        content="This admin will be removed permanently! Are you sure?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={removeLoading}
            onClick={handleRemoveAdmin}
          >
            OK
          </LoadingButton>
        }
      />
    </>
  );
}
