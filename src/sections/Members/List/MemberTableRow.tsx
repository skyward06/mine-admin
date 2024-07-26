import type { Member } from 'src/__generated__/graphql';

import { useState } from 'react';
import { useMutation } from '@apollo/client';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { fDate, fTime } from 'src/utils/format-time';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';

import { UPDATE_PASSWORD_QUERY } from '../query';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Member;
  action?: boolean;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function MemberTableRow({
  row,
  selected,
  action = true,
  confirm: removeConfirm,
  setSelected,
}: Props) {
  const [newPassword, setNewPassword] = useState<any>();
  const router = useRouter();

  const confirm = useBoolean();
  const password = useBoolean();

  const { id, username, email, mobile, primaryAddress, assetId, wallet, createdAt, sales } = row;

  const [updatePassword] = useMutation(UPDATE_PASSWORD_QUERY);

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

        <TableCell>{mobile}</TableCell>

        <TableCell>{primaryAddress}</TableCell>

        <TableCell>{assetId}</TableCell>

        <TableCell>{wallet}</TableCell>

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
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
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
            <Tooltip title="Password" placement="top" arrow>
              <IconButton
                color="default"
                onClick={() => {
                  confirm.onTrue();
                }}
              >
                <Iconify icon="basil:unlock-solid" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="top" arrow>
              <IconButton
                color="error"
                disabled={!!sales?.length}
                onClick={() => {
                  removeConfirm.onTrue();
                  setSelected(id);
                }}
              >
                <Iconify icon="bxs:coffee-togo" />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Reset Password"
        content={resetContent}
        action={
          <Button
            variant="contained"
            color="info"
            onClick={async () => {
              try {
                await updatePassword({ variables: { data: { id, newPassword } } });

                toast.success('password updated successfully!');

                confirm.onFalse();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            OK
          </Button>
        }
      />
    </>
  );
}
