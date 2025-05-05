import type { Member } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { formatID, customizeFullName } from 'src/utils/helper';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

interface Props {
  open: UseBooleanReturn;
  member: Member;
}

export default function SignUpInfo({ open, member }: Props) {
  const router = useRouter();

  return (
    <Dialog open={open.value} onClose={open.onFalse} fullWidth maxWidth="md">
      <DialogTitle>{customizeFullName(member?.fullName)}</DialogTitle>

      <Divider flexItem sx={{ borderStyle: 'dashed', mb: 2 }} />

      <DialogContent sx={{ pb: 4 }}>
        <Grid container spacing={1}>
          <Grid md={6} container>
            <Grid md={12} container>
              <Grid md={4}>
                <Typography fontWeight={700}>Email:</Typography>{' '}
              </Grid>
              <Grid md={8}>{member?.signupFormRequest.email}</Grid>
            </Grid>
            <Grid md={12} container>
              <Grid md={4}>
                <Typography fontWeight={700}>Username:</Typography>{' '}
              </Grid>
              <Grid md={8}>{member?.signupFormRequest.username}</Grid>
            </Grid>
            <Grid md={12} container>
              <Grid md={4}>
                <Typography fontWeight={700}>Sponsor:</Typography>{' '}
              </Grid>
              <Grid md={8}>{member?.signupFormRequest?.sponsorUserId}</Grid>
            </Grid>
            <Grid md={12} container>
              <Grid md={4}>
                <Typography fontWeight={700}>Package: </Typography>
              </Grid>
              <Grid md={8}>{member?.signupFormRequest?.package}</Grid>
            </Grid>
          </Grid>
          <Grid md={6} container>
            <Grid md={12} container>
              <Grid md={4}>
                <Typography fontWeight={700}>Mobile:</Typography>{' '}
              </Grid>
              <Grid md={8}>{member?.signupFormRequest.mobile}</Grid>
            </Grid>
            <Grid md={12} container>
              <Grid md={4}>
                <Typography fontWeight={700}>Full Name:</Typography>{' '}
              </Grid>
              <Grid md={8}>{member?.signupFormRequest.fullName}</Grid>
            </Grid>
            {member?.signupFormRequest.promoCode && (
              <Grid md={12} container>
                <Grid md={4}>
                  <Typography fontWeight={700}>Promo:</Typography>{' '}
                </Grid>
                <Grid md={8}>{member?.signupFormRequest.promoCode}</Grid>
              </Grid>
            )}
            <Grid md={12} container>
              <Grid md={4}>
                <Typography fontWeight={700}>Payment Method: </Typography>
              </Grid>
              <Grid md={8}>{member?.signupFormRequest.paymentMethod}</Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 0.5 }}>
          <Grid md={2}>
            <Typography fontWeight={700}>Note: </Typography>
          </Grid>
          <Grid md={10}>{member?.signupFormRequest.note}</Grid>
        </Grid>

        {member.signupFormRequest?.saleID && (
          <Grid container sx={{ mt: 0.5 }}>
            <Grid md={2}>
              <Typography fontWeight={700}>Sale ID: </Typography>
            </Grid>
            <Grid
              md={10}
              onClick={() =>
                router.push(paths.dashboard.sales.edit(member?.signupFormRequest?.saleID))
              }
            >
              {formatID(member?.signupFormRequest?.saleID ?? '')}
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
