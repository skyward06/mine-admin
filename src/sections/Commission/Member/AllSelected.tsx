import type { TableProps } from 'src/components/Table';

import { useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { useBoolean } from 'src/hooks/useBoolean';

import { ConfirmationStatus } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { CustomPopover, type UsePopoverReturn } from 'src/components/custom-popover';

import { useFetchCommissions, useUpdateCommissionStatus } from '../useApollo';

import type { CommissionRole } from './types';

interface Props {
  status: CommissionRole;
  table: TableProps;
  popover: UsePopoverReturn;
}

export default function AllSelected({ status, table, popover }: Props) {
  const all = useBoolean();

  const { data, updateCommissionStatus } = useUpdateCommissionStatus();
  const { weeklyCommissions, fetchCommissions } = useFetchCommissions();

  useEffect(() => {
    fetchCommissions({ variables: { filter: { status: status.toUpperCase() } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (all.value) {
      table.onSelectAllRows(
        true,
        weeklyCommissions!.map((row) => row!.id)
      );
    } else {
      table.setSelected([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all]);

  useEffect(() => {
    if (table.selected.length === 0) {
      all.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return (
    <>
      <Checkbox onClick={all.onToggle} checked={all.value} />
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-center' } }}
      >
        <MenuList>
          <MenuItem
            sx={{ color: 'secondary.main' }}
            disabled={status === 'approved'}
            onClick={async () => {
              await updateCommissionStatus({
                variables: { data: { ids: table.selected, status: ConfirmationStatus.Approved } },
              });

              if (data) {
                toast.message('Successfully Approved!');
              } else {
                toast.message('Something went wrong!');
              }

              all.onFalse();
              popover.onClose();
              table.setSelected([]);
            }}
          >
            <Iconify icon="mage:check-circle-fill" />
            Approve
          </MenuItem>
          <MenuItem
            sx={{ color: 'error.main' }}
            disabled={status === 'declined'}
            onClick={async () => {
              await updateCommissionStatus({
                variables: { data: { ids: table.selected, status: ConfirmationStatus.Declined } },
              });

              if (data) {
                toast.message('Successfully Declined!');
              } else {
                toast.message('Something went wrong!');
              }

              all.onFalse();
              popover.onClose();
              table.setSelected([]);
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
