import type { Member } from 'src/__generated__/graphql';

import { ApolloError } from '@apollo/client';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { CustomPopover, type UsePopoverReturn } from 'src/components/custom-popover';

import SignUpInfo from './SignUpInfo';
import LinkAccount from './LinkAccount';
import { useDuplicateMember, useSendWelcomeEmail, useVerifyMemberEmail } from '../../useApollo';

interface Props {
  memberId: string;
  currentMember: Member;
  popover: UsePopoverReturn;
}

export default function Settings({ popover, memberId, currentMember }: Props) {
  const router = useRouter();

  const copy = useBoolean();
  const link = useBoolean();
  const sign = useBoolean();

  const address = [
    currentMember?.fullName,
    currentMember?.primaryAddress,
    currentMember?.secondaryAddress,
    `${currentMember?.city}, ${currentMember?.state}, ${currentMember?.zipCode}`,
  ];

  const { duplicateMember } = useDuplicateMember();
  const { verifyMemberEmail } = useVerifyMemberEmail();
  const { loading, sendWelcomeEmail } = useSendWelcomeEmail();

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

  return (
    <>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              const searchParams = new URLSearchParams({ memberId }).toString();
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
          <MenuItem onClick={link.onTrue}>
            <Iconify icon="heroicons:link-16-solid" color="#00cca4" />
            Link account
          </MenuItem>
        </MenuList>
      </CustomPopover>

      {currentMember?.signupFormRequest && <SignUpInfo open={sign} member={currentMember} />}

      <LinkAccount open={link} currentMember={currentMember} />
    </>
  );
}
