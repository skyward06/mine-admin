import { useEffect } from 'react';

import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { ConfirmationStatus } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useFetchCommissions, useUpdateCommissionStatus } from '../useApollo';

import type { CommissionRole } from './types';

interface Props {
  status: CommissionRole;
}

export default function AllSelected({ status }: Props) {
  const popover = usePopover();

  const { data, updateCommissionStatus } = useUpdateCommissionStatus();
  const { weeklyCommissions, fetchCommissions } = useFetchCommissions();

  useEffect(() => {
    fetchCommissions({ variables: { filter: { status: status.toUpperCase() } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <Tooltip title="All Select" placement="top" arrow>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="si:more-horiz-fill" />
        </IconButton>
      </Tooltip>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-center' } }}
      >
        <MenuList>
          <MenuItem
            sx={{ color: 'secondary.main' }}
            disabled={status === 'approved' || status === 'paid'}
            onClick={async () => {
              await updateCommissionStatus({
                variables: {
                  data: {
                    ids: weeklyCommissions.map((row) => row?.id ?? ''),
                    status: ConfirmationStatus.Approved,
                  },
                },
              });

              if (data) {
                toast.message('Successfully Approved!');
              } else {
                toast.message('Something went wrong!');
              }

              popover.onClose();
            }}
          >
            <Iconify icon="mage:check-circle-fill" />
            Approve
          </MenuItem>
          <MenuItem
            sx={{ color: 'success.main' }}
            disabled={status === 'paid'}
            onClick={async () => {
              await updateCommissionStatus({
                variables: {
                  data: {
                    ids: weeklyCommissions.map((row) => row?.id ?? ''),
                    status: ConfirmationStatus.Paid,
                  },
                },
              });

              if (data) {
                toast.message('Successfully Paid!');
              } else {
                toast.message('Something went wrong!');
              }

              popover.onClose();
            }}
          >
            <Iconify icon="ic:round-paid" />
            Pay
          </MenuItem>
          <MenuItem
            sx={{ color: 'error.main' }}
            disabled={status === 'declined' || status === 'paid'}
            onClick={async () => {
              await updateCommissionStatus({
                variables: {
                  data: {
                    ids: weeklyCommissions.map((row) => row?.id ?? ''),
                    status: ConfirmationStatus.Declined,
                  },
                },
              });

              if (data) {
                toast.message('Successfully Declined!');
              } else {
                toast.message('Something went wrong!');
              }

              popover.onClose();
            }}
          >
            <Iconify icon="material-symbols:cancel" />
            Decline
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
