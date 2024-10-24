import type { Member } from 'src/__generated__/graphql';

import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDate, formatTime } from 'src/utils/format-time';

// import { Label } from 'src/components/Label';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';

import { useUpdatePassword } from '../useApollo';

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

  const {
    id,
    username,
    email,
    mobile,
    assetId,
    point,
    fullName,
    // syncWithSendy,
    totalIntroducers,
    // emailVerified,
    // status,
    createdAt,
    sales,
  } = row;

  const { updatePassword } = useUpdatePassword();
  // const { approveMember } = useApproveMember();

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

        <TableCell>{fullName}</TableCell>

        <TableCell>{mobile}</TableCell>

        <TableCell>{assetId}</TableCell>

        <TableCell>{point}</TableCell>

        {/* <TableCell>
          {!emailVerified && (
            <Label variant="soft" color="error">
              Email Unverified
            </Label>
          )}
          {!status && (
            <Label variant="soft" color="warning">
              Pending
            </Label>
          )}
        </TableCell> */}

        <TableCell
          sx={{
            cursor: 'pointer',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
          onClick={() => handleSponsors()}
        >
          {totalIntroducers}
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
          <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
            {/* <Grid container lg={12} justifyContent="space-around">
              <Grid>
                {!status && (
                  <Tooltip title="Approve" placement="top" arrow>
                    <IconButton
                      color="success"
                      onClick={() => {
                        approveMember({ variables: { data: { id } } });
                      }}
                    >
                      <Iconify icon="fa6-solid:circle-check" />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid>
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
              </Grid>
              <Grid>
                <Tooltip title="Reset Password" placement="top" arrow>
                  <IconButton
                    color="default"
                    onClick={() => {
                      confirm.onTrue();
                    }}
                  >
                    <Iconify icon="basil:unlock-solid" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid>
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
              </Grid>
            </Grid> */}
            <Grid container lg={12} justifyContent="space-around">
              <Grid>
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
              </Grid>
              <Grid>
                <Tooltip title="Reset Password" placement="top" arrow>
                  <IconButton
                    color="default"
                    onClick={() => {
                      confirm.onTrue();
                    }}
                  >
                    <Iconify icon="basil:unlock-solid" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid>
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
              </Grid>
            </Grid>
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
