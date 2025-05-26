import type { Member } from 'src/__generated__/graphql';

import { useState, useEffect } from 'react';
import { ApolloError } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';
import { truncateMiddle } from 'src/utils/formatNumber';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import SignUpInfo from './SignUpInfo';
import {
  useDuplicateMember,
  useSendWelcomeEmail,
  useVerifyMemberEmail,
  useFetchMemberOverview,
} from '../../useApollo';

interface Props {
  currentMember: Member;
}

export const Personal = ({ currentMember }: Props) => {
  const copy = useBoolean();
  const sign = useBoolean();
  const checked = useBoolean();

  const params = useParams();
  const router = useRouter();
  const popover = usePopover();

  const [children, setChildren] = useState<any>();

  const { id } = params;

  const { overview } = useFetchMemberOverview(id!);
  const { duplicateMember } = useDuplicateMember();
  const { verifyMemberEmail } = useVerifyMemberEmail();
  const { loading, sendWelcomeEmail } = useSendWelcomeEmail();

  const address = [
    currentMember?.fullName,
    currentMember?.primaryAddress,
    currentMember?.secondaryAddress,
    `${currentMember?.city}, ${currentMember?.state}, ${currentMember?.zipCode}`,
  ];

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

  const handleCopy = async (addressValue: string) => {
    try {
      await navigator.clipboard.writeText(addressValue);
      checked.onTrue();

      setTimeout(() => {
        checked.onFalse();
      }, 3000);
    } catch (err) {
      console.error('Failed to copy test: ', err);
    }
  };

  const sendEmail = async () => {
    try {
      const { data } = await sendWelcomeEmail({
        variables: { data: { email: currentMember?.email! } },
      });

      if (data) {
        toast.success('Successfully sent welcome email');
        popover.onClose();
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
      const { data } = await verifyMemberEmail({ variables: { data: { id: currentMember?.id! } } });

      if (data) {
        toast.success('Successfully verified!');
        popover.onClose();
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleDuplicateMember = async () => {
    try {
      const { data } = await duplicateMember({ variables: { data: { id: currentMember?.id! } } });

      if (data) {
        toast.success('Successfully duplicated!');
        popover.onClose();
      }
    } catch (error) {
      toast.error('Error: ', error.message);
    }
  };

  useEffect(() => {
    setChildren(
      currentMember?.placementChildren?.reduce(
        (prev, save) => ({ ...prev, [save.placementPosition]: save?.fullName }),
        {}
      )
    );
  }, [currentMember]);

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
              <Typography variant="subtitle1">{currentMember?.fullName}</Typography>
              {currentMember?.emailVerified && (
                <Iconify icon="pajamas:partner-verified" color="green" sx={{ mt: 0.1 }} />
              )}
            </Stack>
            <Stack direction="row">
              <Typography variant="body2" sx={{ pt: 0.9 }}>
                {formatID(currentMember?.ID ?? '')}
              </Typography>

              <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                <Iconify icon="eva:more-horizontal-fill" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack>
            {/* Basic info */}
            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Username:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.username}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Sponsor:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography
                  variant="body2"
                  sx={{ color: '#00c869', cursor: 'pointer' }}
                  onClick={() => {
                    router.push(paths.dashboard.members.edit(currentMember?.sponsor?.id ?? ''));
                    router.refresh();
                  }}
                >
                  {currentMember?.sponsor?.fullName}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Email:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.email}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Mobile:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.mobile}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Address:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.primaryAddress}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Address 2:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.secondaryAddress}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  City:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.city}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  ZIP Code:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.zipCode}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Country:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.country}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  State:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.state}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  TXC Coin ID:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.assetId}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  ETH Coin ID:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.ethAssetId}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  PromoCode:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.promoCode}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Joined At:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">
                  {currentMember?.createdAt ? formatDate(currentMember.createdAt) : ''}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Commission Default:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.commissionDefault}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Purchase Limit:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{overview?.orderedAvailablePoint}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Peer Address:
                </Typography>
              </Stack>
              {currentMember?.peerETHAddress && (
                <Stack width={1} direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">
                    {truncateMiddle(currentMember?.peerETHAddress ?? '', 30)}
                  </Typography>
                  <Iconify
                    sx={{ cursor: 'pointer' }}
                    icon={checked.value ? 'system-uicons:check' : 'stash:copy-light'}
                    onClick={() => handleCopy(currentMember?.peerETHAddress ?? '')}
                  />
                </Stack>
              )}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

            {/* Team info */}
            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Group:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.groupSetting?.name}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Team Strategy:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.teamStrategy}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Starting Points:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{`L${currentMember?.commission?.begL ?? 0}, R${currentMember?.commission?.begR ?? 0}`}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  New Points:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{`L${currentMember?.commission?.newL ?? 0}, R${currentMember?.commission?.newR ?? 0}`}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Placement Parent:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{currentMember?.placementParent?.fullName}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Miner Left:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{children?.LEFT}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} pb={1}>
              <Stack width={0.5}>
                <Typography variant="body2" fontWeight="bold">
                  Miner Right:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{children?.RIGHT}</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          {/* Wallet info */}
          <Stack sx={{ mt: 2 }}>
            {currentMember?.memberWallets?.map((item) => (
              <Stack pb={1}>
                <Typography variant="body2" fontWeight="bold">
                  {item?.payout?.method}
                </Typography>
                <Typography variant="body2">{item?.address}</Typography>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          {/* Setting info */}
          <Typography variant="body1" fontWeight="bold" my={2}>
            Setting
          </Typography>

          <Stack direction="row" spacing={2} pb={1}>
            <Stack width={0.5}>
              <Typography variant="body2" fontWeight="bold">
                Communication:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Iconify
                icon={
                  !currentMember?.setting || currentMember?.setting?.communication
                    ? 'ic:twotone-check-box'
                    : 'iconamoon:sign-times-square-duotone'
                }
                color={
                  !currentMember?.setting || currentMember?.setting?.communication ? 'green' : 'red'
                }
              />
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          {/* Session info */}
          <Typography variant="body1" fontWeight="bold" mt={2}>
            Session
          </Typography>

          <Stack direction="row" spacing={2} pb={1}>
            <Stack width={0.5}>
              <Typography variant="body2" fontWeight="bold">
                IP Address:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{currentMember?.session?.ipAddress}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} pb={1}>
            <Stack width={0.5}>
              <Typography variant="body2" fontWeight="bold">
                Device:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{currentMember?.session?.device}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} pb={1}>
            <Stack width={0.5}>
              <Typography variant="body2" fontWeight="bold">
                Platform:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{currentMember?.session?.platform}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} pb={1}>
            <Stack width={0.5}>
              <Typography variant="body2" fontWeight="bold">
                OS:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{currentMember?.session?.os}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} pb={1}>
            <Stack width={0.5}>
              <Typography variant="body2" fontWeight="bold">
                Browser:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">
                {currentMember?.session?.browser} {currentMember?.session?.browserVersion}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} pb={1}>
            <Stack width={0.5}>
              <Typography variant="body2" fontWeight="bold">
                Fingerprint:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{currentMember?.session?.userAgent}</Typography>
            </Stack>
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
            Welcome Email
          </MenuItem>
          <MenuItem
            onClick={() => {
              sign.onTrue();
              popover.onClose();

              if (!currentMember?.signupFormRequest) {
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
          <MenuItem onClick={handleDuplicateMember}>
            <Iconify icon="heroicons-solid:document-duplicate" color="#00cca4" />
            Duplicate
          </MenuItem>
        </MenuList>
      </CustomPopover>

      {currentMember?.signupFormRequest && <SignUpInfo open={sign} member={currentMember} />}
    </>
  );
};
