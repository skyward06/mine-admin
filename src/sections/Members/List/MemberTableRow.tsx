import type { Member } from 'src/__generated__/graphql';

import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { formatDate, formatTime } from 'src/utils/format-time';

import { Label } from 'src/components/Label';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useApproveMember, useUpdatePassword } from '../useApollo';

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
  const popover = usePopover();
  const confirm = useBoolean();
  const password = useBoolean();
  const copy = useBoolean();

  const {
    id,
    ID,
    username,
    email,
    mobile,
    assetId,
    point,
    fullName,
    totalIntroducers,
    emailVerified,
    status,
    createdAt,
    primaryAddress,
    secondaryAddress,
    city,
    state,
    zipCode,
    sales,
  } = row;

  const { loading, updatePassword } = useUpdatePassword();
  const { approveMember } = useApproveMember();

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

  const handleSponsors = () => {
    window.open(`${paths.dashboard.members.root}?sponsorId=${id}`, '_blank');
  };

  const address = [fullName, primaryAddress, secondaryAddress, `${city}, ${state}, ${zipCode}`];

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address.join('\n'));

      copy.onTrue();

      setTimeout(() => {
        copy.onFalse();
      }, 3000);
    } catch (error) {
      console.log('Failed to copy text: ', error);
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {ID ? formatID(ID) : <Iconify icon="vaadin:line-h" color="gray" />}
        </TableCell>

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

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fullName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{mobile}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{assetId}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{point}</TableCell>

        <TableCell
          sx={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
          onClick={() => handleSponsors()}
        >
          {totalIntroducers}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Stack direction="row" columnGap={1}>
            {!emailVerified && (
              <Label variant="soft" color="error">
                Email Unverified
              </Label>
            )}
            {status ? (
              <Label variant="soft" color="success">
                Approved
              </Label>
            ) : (
              <Label variant="soft" color="warning">
                Pending
              </Label>
            )}
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
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

        {action && (
          <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            <CustomPopover
              open={popover.open}
              anchorEl={popover.anchorEl}
              onClose={popover.onClose}
              slotProps={{ arrow: { placement: 'right-top' } }}
            >
              <MenuList>
                {!status && (
                  <MenuItem
                    onClick={() => {
                      approveMember({ variables: { data: { id } } });
                    }}
                  >
                    <Iconify icon="fa6-solid:circle-check" color="green" />
                    Approve
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    router.push(`${paths.dashboard.members.edit(id)}`);
                  }}
                >
                  <Iconify icon="solar:eye-bold" color="gray" />
                  View
                </MenuItem>
                <MenuItem onClick={confirm.onTrue}>
                  <Iconify icon="basil:unlock-solid" color="gray" />
                  Reset Password
                </MenuItem>
                <MenuItem
                  disabled={!!sales?.length}
                  onClick={() => {
                    removeConfirm.onTrue();
                    setSelected(id);
                  }}
                >
                  <Iconify icon="bxs:coffee-togo" color="red" />
                  Delete
                </MenuItem>
                <MenuItem onClick={copyAddress}>
                  <Iconify icon={copy.value ? 'ci:check' : 'bxs:copy'} color="green" />
                  Copy Address
                </MenuItem>
              </MenuList>
            </CustomPopover>
          </TableCell>
        )}
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
                await updatePassword({ variables: { data: { id, newPassword } } });

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
