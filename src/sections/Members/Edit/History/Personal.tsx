import { useState, useEffect } from 'react';
import { ApolloError } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { fCurrency } from 'src/utils/formatNumber';
import { formatDate } from 'src/utils/format-time';
import { formatID, customizeFullName } from 'src/utils/helper';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useFetchMembers, useSendWelcomeEmail, useVerifyMemberEmail } from '../../useApollo';

export const Personal = () => {
  const copy = useBoolean();
  const sign = useBoolean();

  const params = useParams();
  const router = useRouter();
  const popover = usePopover();

  const [children, setChildren] = useState<any>();

  const { id } = params;

  const { members, fetchMembers } = useFetchMembers();
  const { verifyMemberEmail } = useVerifyMemberEmail();
  const { loading, sendWelcomeEmail } = useSendWelcomeEmail();

  const member = members[0];

  const address = [
    member?.fullName,
    member?.primaryAddress,
    member?.secondaryAddress,
    `${member?.city}, ${member?.state}, ${member?.zipCode}`,
  ];

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

  const sendEmail = async () => {
    try {
      const { data } = await sendWelcomeEmail({ variables: { data: { email: member.email } } });

      if (data) {
        toast.success('Successfully sent welcome email');
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const [err] = error.graphQLErrors;

        toast.error(err.message);
      }
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const { data } = await verifyMemberEmail({ variables: { data: { id: member.id } } });

      if (data) {
        toast.success('Successfully verified!');
        popover.onClose();
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    setChildren(
      member?.placementChildren?.reduce(
        (prev, save) => ({ ...prev, [save.placementPosition]: save?.fullName }),
        {}
      )
    );
  }, [member]);

  useEffect(() => {
    fetchMembers({ variables: { filter: { id: id ?? '' } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Grid xl={12}>
        <Card sx={{ mt: 2, p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ pb: 2 }}
            columnGap={2}
            alignItems="center"
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1">{member?.fullName}</Typography>
              {member?.emailVerified && (
                <Iconify icon="pajamas:partner-verified" color="green" sx={{ mt: 0.1 }} />
              )}
            </Stack>
            <Stack direction="row">
              <Typography variant="body2" sx={{ pt: 0.9 }}>
                {formatID(member?.ID ?? '')}
              </Typography>

              <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                <Iconify icon="eva:more-horizontal-fill" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack>
            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Username:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.username}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Sponsor:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography
                  variant="body2"
                  sx={{ color: '#00c869', cursor: 'pointer' }}
                  onClick={() => {
                    router.push(paths.dashboard.members.edit(member?.sponsor?.id ?? ''));
                    router.refresh();
                  }}
                >
                  {member?.sponsor?.fullName}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Email:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.email}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Mobile:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.mobile}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Address:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.primaryAddress}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Address 2:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.secondaryAddress}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  City:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.city}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  ZIP Code:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.zipCode}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Country:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.country}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  State:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.state}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Asset ID:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.assetId}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  PromoCode:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.promoCode}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Joined At:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">
                  {member?.createdAt ? formatDate(member.createdAt) : ''}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Balance:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{fCurrency((member?.balance || 0) / 100)}</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Group:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.groupName}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Team Strategy:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.teamStrategy}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Starting Points:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{`L${member?.commission?.begL ?? 0}, R${member?.commission?.begR ?? 0}`}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  New Points:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{`L${member?.commission?.newL ?? 0}, R${member?.commission?.newR ?? 0}`}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Placement Parent:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.placementParent?.fullName}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Miner Left:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{children?.LEFT}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Miner Right:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{children?.RIGHT}</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Stack sx={{ mt: 2 }}>
            {member?.memberWallets?.map((item) => (
              <Stack sx={{ pb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {item?.payout?.method}
                </Typography>
                <Typography variant="body2">{item?.address}</Typography>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Grid>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              const searchParams = new URLSearchParams({ memberId: id ?? '' }).toString();
              router.push(`${paths.dashboard.placement.root}?${searchParams}`);
            }}
          >
            <Iconify icon="solar:eye-bold" color="#00cca4" />
            Placement
          </MenuItem>
          <MenuItem onClick={copyAddress}>
            <Iconify icon={copy.value ? 'ci:check' : 'bxs:copy'} color="#00cca4" />
            Copy Address
          </MenuItem>
          <MenuItem onClick={sendEmail}>
            <Iconify
              icon={loading ? 'line-md:loading-loop' : 'mingcute:send-plane-fill'}
              color="#00cca4"
            />
            Welcom Email
          </MenuItem>
          <MenuItem
            onClick={() => {
              sign.onTrue();
              popover.onClose();

              if (!member?.signupFormRequest) {
                toast.warning('He has been added by the admin');
              }
            }}
          >
            <Iconify icon="heroicons:user-solid" color="#00cca4" />
            Sign Up Info
          </MenuItem>
          <MenuItem onClick={handleVerifyEmail}>
            <Iconify icon="mdi:email-verified" color="#00cca4" />
            Verify Email
          </MenuItem>
        </MenuList>
      </CustomPopover>

      {member?.signupFormRequest && (
        <Dialog open={sign.value} onClose={sign.onFalse} fullWidth maxWidth="md">
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
                  <Grid md={8}>{member?.signupFormRequest?.sponsorId}</Grid>
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
                <Grid md={12} container>
                  <Grid md={4}>
                    <Typography fontWeight={700}>Promo:</Typography>{' '}
                  </Grid>
                  <Grid md={8}>{member?.signupFormRequest.promoCode}</Grid>
                </Grid>
                <Grid md={12} container>
                  <Grid md={4}>
                    <Typography fontWeight={700}>Payment Method: </Typography>
                  </Grid>
                  <Grid md={8}>{member?.signupFormRequest.paymentMethod}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
