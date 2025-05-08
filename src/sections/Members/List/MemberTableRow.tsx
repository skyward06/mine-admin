import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
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

import { formatDate, formatTime } from 'src/utils/format-time';
import { formatID, cutString, customizeFullName } from 'src/utils/helper';

import { Label } from 'src/components/Label';
import UserItem from 'src/components/UserItem';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import {
  useMoveToPaid,
  useLogoutForce,
  useUpdateMember,
  useApproveMember,
  useMoveToBlocked,
  useMoveToPending,
  useUpdatePassword,
  useMoveToGraveyard,
  useDuplicateMember,
  useResetBonusClock,
  useVerifyMemberEmail,
} from '../useApollo';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  /* Todo: Update type as Member */
  row: any;
  tabs: any;
  action?: boolean;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function MemberTableRow({
  row,
  tabs,
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
  const open = useBoolean();

  const {
    id,
    ID,
    city,
    sales,
    state,
    email,
    avatar,
    mobile,
    assetId,
    zipCode,
    username,
    fullName,
    createdAt,
    adminNotes,
    allowState,
    emailVerified,
    primaryAddress,
    totalIntroducers,
    secondaryAddress,
    signupFormRequest,
    placementRequested,
  } = row;

  const { moveToPaid } = useMoveToPaid();
  const { logoutForce } = useLogoutForce();
  const { updateMember } = useUpdateMember();
  const { moveToPending } = useMoveToPending();
  const { duplicateMember } = useDuplicateMember();
  const { moveToGraveyard } = useMoveToGraveyard();
  const { resetBonusClock } = useResetBonusClock();
  const { verifyMemberEmail } = useVerifyMemberEmail();
  const { loading, updatePassword } = useUpdatePassword();
  const { loading: blockLoading, moveToBlocked } = useMoveToBlocked();
  const { loading: approveLoading, approveMember } = useApproveMember();

  const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;

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
      toast.error('Failed to copy text: ', error.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const { data } = await verifyMemberEmail({ variables: { data: { id } } });

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
      const { data } = await duplicateMember({ variables: { data: { id } } });

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
      const { data } = await resetBonusClock({ variables: { data: { id } } });

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
      const { data } = await moveToBlocked({ variables: { data: { id } } });

      if (data) {
        toast.success('Successfully blocked!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForceLogout = async () => {
    try {
      const { data } = await logoutForce({ variables: { data: { id } } });

      if (data) {
        toast.success('Successfully logged out!');
        popover.onClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handlePRChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateMember({
        variables: {
          data: {
            id,
            placementRequested: event.target.checked,
          },
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{ID ? formatID(ID) : <Iconify icon="vaadin:line-h" color="gray" />}</TableCell>

        <TableCell
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
          onClick={() => {
            router.push(paths.dashboard.members.edit(id));
          }}
        >
          <UserItem user={{ username, email, avatar }} />
        </TableCell>

        <TableCell>{customizeFullName(fullName)}</TableCell>

        <TableCell>{mobile}</TableCell>

        <TableCell>{cutString(assetId ?? '', 6)}</TableCell>

        {tabs === 'PENDING' ? (
          <TableCell>{signupFormRequest?.paymentMethod}</TableCell>
        ) : (
          <TableCell
            sx={{
              cursor: 'pointer',
              '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
            }}
            onClick={() => handleSponsors()}
          >
            {totalIntroducers}
          </TableCell>
        )}

        <TableCell>
          <Switch defaultChecked={placementRequested} onChange={handlePRChange} />
        </TableCell>

        <TableCell>
          <Stack direction="row" columnGap={1}>
            {allowState === 'APPROVED' && (
              <Label variant="soft" color="success">
                Approved
              </Label>
            )}
            {allowState === 'PENDING' && (
              <Label variant="soft" color="warning">
                Pending
              </Label>
            )}
            {allowState === 'PAID' && (
              <Label variant="soft" color="secondary">
                Paid
              </Label>
            )}
            {allowState === 'GRAVEYARD' && (
              <Label variant="soft" color="error">
                Graveyard
              </Label>
            )}
            {allowState === 'BLOCKED' && (
              <Label variant="soft" color="error">
                Block
              </Label>
            )}
            {!emailVerified && (
              <Label variant="soft" color="error">
                Unverified
              </Label>
            )}
          </Stack>
        </TableCell>

        <TableCell>
          {cutString(
            `${adminNotes?.length ? adminNotes[(adminNotes?.length ?? 0) - 1]?.description : ''}`,
            20
          )}
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

        {action && (
          <TableCell align="center">
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
                {allowState === 'PENDING' && (
                  <>
                    <MenuItem
                      onClick={async () => {
                        try {
                          await approveMember({ variables: { data: { id } } });

                          toast.success('Successfully approved');
                        } catch (error) {
                          toast.error('Something went wrong!');
                        }
                      }}
                    >
                      <Iconify icon="fa6-solid:circle-check" color="green" />
                      Approve
                      {approveLoading && <Iconify icon="eos-icons:bubble-loading" />}
                    </MenuItem>
                    <MenuItem
                      onClick={async () => {
                        try {
                          await moveToGraveyard({ variables: { data: { id } } });

                          toast.success('Successfully moved');
                        } catch (error) {
                          toast.error('Something went wrong!');
                        }
                      }}
                    >
                      <Iconify icon="mdi:graveyard" color="Tomato" />
                      Move to Graveyard
                    </MenuItem>
                    <MenuItem
                      onClick={async () => {
                        try {
                          await moveToPaid({ variables: { data: { id } } });

                          toast.success('Successfully moved');
                        } catch (error) {
                          toast.error('Something went wrong!');
                        }
                      }}
                    >
                      <Iconify icon="ic:baseline-paid" color="green" />
                      Move to Paid
                    </MenuItem>
                  </>
                )}
                {allowState === 'GRAVEYARD' && (
                  <MenuItem
                    onClick={async () => {
                      try {
                        await moveToPending({ variables: { data: { id } } });

                        toast.success('Successfully moved');
                      } catch (error) {
                        toast.error('Something went wrong!');
                      }
                    }}
                  >
                    <Iconify icon="mdi:account-pending" color="#B76E00" />
                    Move to Pending
                  </MenuItem>
                )}
                {allowState === 'PAID' && (
                  <>
                    <MenuItem
                      onClick={async () => {
                        try {
                          await approveMember({ variables: { data: { id } } });

                          toast.success('Successfully approved');
                        } catch (error) {
                          toast.error('Something went wrong!');
                        }
                      }}
                    >
                      <Iconify icon="fa6-solid:circle-check" color="green" />
                      Approve
                    </MenuItem>
                    <MenuItem
                      onClick={async () => {
                        try {
                          await moveToPending({ variables: { data: { id } } });

                          toast.success('Successfully moved');
                        } catch (error) {
                          toast.error('Something went wrong!');
                        }
                      }}
                    >
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
                  disabled={!!sales?.length}
                  onClick={() => {
                    removeConfirm.onTrue();
                    popover.onClose();
                    setSelected(id);
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
                if (!passwordRegexp.test(newPassword)) {
                  toast.error(
                    'Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
                  );
                  return;
                }

                await updatePassword({ variables: { data: { id, newPassword } } });

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

      <Detail open={open} id={id} />
    </>
  );
}
