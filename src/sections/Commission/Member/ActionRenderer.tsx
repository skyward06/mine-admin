import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import Dialog from '@mui/material/Dialog';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { COMMISSION_TYPE } from 'src/consts';
import { ConfirmationStatus } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import PlacementTreeView from './Placement';
import { useUpdateCommission } from '../useApollo';

import type { WeeklyCommission } from '../type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<WeeklyCommission>) => {
    const detailOpen = useBoolean();
    const placementOpen = useBoolean();

    const popover = usePopover();

    const { updateCommission } = useUpdateCommission();

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
            <MenuItem
              onClick={() => {
                placementOpen.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="clarity:flow-chart-line" />
              Placement
            </MenuItem>
            <MenuItem
              onClick={() => {
                detailOpen.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:eye-bold" />
              View
            </MenuItem>
            <MenuItem
              disabled={data?.status !== COMMISSION_TYPE.PENDING.label}
              onClick={async () => {
                const { data: result } = await updateCommission({
                  variables: { data: { id: data?.id!, status: ConfirmationStatus.Approved } },
                });

                if (result) {
                  toast.message('Successfully Approved!');
                } else {
                  toast.message('Something went wrong!');
                }
              }}
            >
              <Iconify icon="mage:check-circle-fill" color="green" />
              Approve
            </MenuItem>
            <MenuItem
              disabled={data?.status !== COMMISSION_TYPE.PENDING.label}
              onClick={async () => {
                const { data: result } = await updateCommission({
                  variables: { data: { id: data?.id!, status: ConfirmationStatus.Declined } },
                });

                if (result) {
                  toast.message('Successfully Declined!');
                } else {
                  toast.message('Something went wrong!');
                }
              }}
            >
              <Iconify icon="material-symbols:cancel" color="red" />
              Decline
            </MenuItem>
          </MenuList>
        </CustomPopover>

        {detailOpen.value && data?.id && <Detail open={detailOpen} id={data?.id!} />}

        <Dialog
          fullWidth
          maxWidth={false}
          open={placementOpen.value}
          onClose={() => placementOpen.onFalse()}
        >
          <PlacementTreeView memberId={data?.memberId ?? ''} weekStartDate={data?.weekStartDate} />
        </Dialog>
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);
