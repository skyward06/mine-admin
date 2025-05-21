import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo, useState } from 'react';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/useBoolean';

import { PASSWORD_REG_EXP } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import {
  useAdminGotIt,
  useMoveToPaid,
  useLogoutForce,
  useRemoveMember,
  useMoveToPending,
  useApproveMember,
  useMoveToBlocked,
  useUpdatePassword,
  useDuplicateMember,
  useMoveToGraveyard,
  useResetBonusClock,
  useVerifyMemberEmail,
} from '../useApollo';

import type { BasicMember } from './type';

export const ActionRender = memo(
  ({ data: current }: CustomCellRendererProps<BasicMember>) => {
    const popover = usePopover();

    const open = useBoolean();
    const copy = useBoolean();
    const confirm = useBoolean();
    const password = useBoolean();
    const removeConfirm = useBoolean();

    const [selected, setSelected] = useState<string>('');
    const [newPassword, setNewPassword] = useState<any>();

    const address = [
      current?.fullName,
      current?.primaryAddress,
      current?.secondaryAddress,
      `${current?.city}, ${current?.state}, ${current?.zipCode}`,
    ];

    const { loading: gotLoading, adminGotIt } = useAdminGotIt();
    const { moveToPaid } = useMoveToPaid();
    const { logoutForce } = useLogoutForce();
    const { moveToPending } = useMoveToPending();
    const { moveToGraveyard } = useMoveToGraveyard();
    const { duplicateMember } = useDuplicateMember();
    const { resetBonusClock } = useResetBonusClock();
    const { verifyMemberEmail } = useVerifyMemberEmail();
    const { loading, updatePassword } = useUpdatePassword();
    const { loading: removeLoading, removeMember } = useRemoveMember();
    const { loading: blockLoading, moveToBlocked } = useMoveToBlocked();
    const { loading: approveLoading, approveMember } = useApproveMember();

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

    const copyAddress = async () => {
      try {
        await navigator.clipboard.writeText(address.join('\n'));

        copy.onTrue();

        setTimeout(() => {
          copy.onFalse();
        }, 3000);
      } catch (error) {
        toast.error('Failed to copy text: ', error.message);
      }
    };

    const handleVerifyEmail = async () => {
      try {
        const { data } = await verifyMemberEmail({ variables: { data: { id: current?.id! } } });

        if (data) {
          toast.success('Successfully verified!');
          popover.onClose();
        }
      } catch (error) {
        toast.error('Error: ', error.message);
      }
    };

    const handleDuplicateMember = async () => {
      try {
        const { data } = await duplicateMember({ variables: { data: { id: current?.id! } } });

        if (data) {
          toast.success('Successfully duplicated!');
          popover.onClose();
        }
      } catch (error) {
        toast.error('Error: ', error.message);
      }
    };

    const handleResetBonus = async () => {
      try {
        const { data } = await resetBonusClock({ variables: { data: { id: current?.id! } } });

        if (data) {
          toast.success('Successfully reseted!');
          popover.onClose();
        }
      } catch (error) {
        toast.error('error => ', error.message);
      }
    };

    const handleLocked = async () => {
      try {
        const { data } = await moveToBlocked({ variables: { data: { id: current?.id! } } });

        if (data) {
          toast.success('Successfully blocked!');
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const handleForceLogout = async () => {
      try {
        const { data } = await logoutForce({ variables: { data: { id: current?.id! } } });

        if (data) {
          toast.success('Successfully logged out!');
          popover.onClose();
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const handleAdminGotIt = async () => {
      try {
        const { data } = await adminGotIt({ variables: { data: { id: current?.id! } } });

        if (data?.adminGotIt.result) {
          toast.success('Operation is done successfully');
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const handleApproveMember = async () => {
      try {
        await approveMember({ variables: { data: { id: current?.id! } } });

        toast.success('Successfully approved');
      } catch (error) {
        toast.error('Something went wrong!');
      }
    };

    const handleMoveToGraveyard = async () => {
      try {
        await moveToGraveyard({ variables: { data: { id: current?.id! } } });

        toast.success('Successfully moved');
      } catch (error) {
        toast.error('Something went wrong!');
      }
    };

    const handleMoveToPaid = async () => {
      try {
        await moveToPaid({ variables: { data: { id: current?.id! } } });

        toast.success('Successfully moved');
      } catch (error) {
        toast.error('Something went wrong!');
      }
    };

    const handleMoveToPending = async () => {
      try {
        await moveToPending({ variables: { data: { id: current?.id! } } });

        toast.success('Successfully moved');
      } catch (error) {
        toast.error('Something went wrong!');
      }
    };

    return (
      <>
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
            {(current?.allowState === 'PENDING' || 'ADDED') && (
              <>
                <MenuItem onClick={handleAdminGotIt} disabled={!!current?.adminUsername}>
                  <Iconify icon="mdi:user-check" color="green" />I got it
                  {gotLoading && <Iconify icon="eos-icons:bubble-loading" />}
                </MenuItem>
                <MenuItem onClick={handleApproveMember}>
                  <Iconify icon="fa6-solid:circle-check" color="green" />
                  Approve
                  {approveLoading && <Iconify icon="eos-icons:bubble-loading" />}
                </MenuItem>
                <MenuItem onClick={handleMoveToGraveyard}>
                  <Iconify icon="mdi:graveyard" color="Tomato" />
                  Move to Graveyard
                </MenuItem>
                <MenuItem onClick={handleMoveToPaid}>
                  <Iconify icon="ic:baseline-paid" color="green" />
                  Move to Paid
                </MenuItem>
              </>
            )}
            {current?.allowState === 'GRAVEYARD' && (
              <MenuItem onClick={handleMoveToPending}>
                <Iconify icon="mdi:account-pending" color="#B76E00" />
                Move to Pending
              </MenuItem>
            )}
            {current?.allowState === 'PAID' && (
              <>
                <MenuItem onClick={handleApproveMember}>
                  <Iconify icon="fa6-solid:circle-check" color="green" />
                  Approve
                </MenuItem>
                <MenuItem onClick={handleMoveToPending}>
                  <Iconify icon="mdi:account-pending" color="#B76E00" />
                  Move to Pending
                </MenuItem>
              </>
            )}
            <MenuItem
              onClick={() => {
                handleLocked();
              }}
            >
              <Iconify icon="ic:round-block" color="red" /> Block
              {blockLoading && <Iconify icon="eos-icons:bubble-loading" />}
            </MenuItem>
            <MenuItem
              onClick={() => {
                open.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:eye-bold" color="gray" /> View
            </MenuItem>
            <MenuItem
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="basil:unlock-solid" color="gray" /> Reset Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                removeConfirm.onTrue();
                popover.onClose();
                setSelected(current?.id ?? '');
              }}
            >
              <Iconify icon="bxs:coffee-togo" color="red" /> Delete
            </MenuItem>
            <MenuItem onClick={copyAddress}>
              <Iconify icon={copy.value ? 'ci:check' : 'bxs:copy'} color="green" /> Copy Address
            </MenuItem>
            <MenuItem onClick={handleVerifyEmail}>
              <Iconify icon="mdi:email-verified" color="green" /> Verify Email
            </MenuItem>
            <MenuItem onClick={handleDuplicateMember}>
              <Iconify icon="heroicons-solid:document-duplicate" color="green" /> Duplicate
            </MenuItem>
            <MenuItem onClick={handleResetBonus}>
              <Iconify icon="typcn:arrow-back" color="green" /> Reset Bonus
            </MenuItem>
            <MenuItem onClick={handleForceLogout}>
              <Iconify icon="tabler:logout" color="red" /> Logout
            </MenuItem>
          </MenuList>
        </CustomPopover>

        <Detail open={open} id={current?.id!} />

        <ConfirmDialog
          open={removeConfirm.value}
          onClose={removeConfirm.onFalse}
          title="Delete"
          content={
            <>
              <Typography>This member will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          }
          action={
            <LoadingButton
              variant="contained"
              color="error"
              loading={removeLoading}
              onClick={async () => {
                try {
                  const promise = await removeMember({ variables: { data: { id: selected } } });
                  const result = promise.data?.removeMember.result;

                  if (result === 'success') {
                    toast.success('Miner removed successfully');
                  } else {
                    toast.error(promise.data?.removeMember.message);
                  }

                  removeConfirm.onFalse();
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              Confirm
            </LoadingButton>
          }
        />

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
                  if (!PASSWORD_REG_EXP.test(newPassword)) {
                    toast.error(
                      'Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
                    );
                    return;
                  }

                  await updatePassword({ variables: { data: { id: current?.id!, newPassword } } });

                  toast.success('Password updated successfully!');

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
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);
