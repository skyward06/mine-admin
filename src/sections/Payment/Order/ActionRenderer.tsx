import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { OrderStatus } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import { useCancelOrder } from '../useApollo';

import type { Order } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Order>) => {
    const open = useBoolean();
    const popover = usePopover();

    const { loading, cancelOrder } = useCancelOrder();

    const handleCancelOrder = async () => {
      try {
        const { data: result } = await cancelOrder({ variables: { data: { ID: data?.id! } } });

        if (result) {
          toast.success('Successfully Canceled');
          popover.onClose();
        }
      } catch (error) {
        toast.error(error.message);
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
            <MenuItem
              onClick={() => {
                open.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:eye-bold" />
              View
            </MenuItem>
            <MenuItem onClick={handleCancelOrder} disabled={data?.status === OrderStatus.Success}>
              <Iconify
                icon={loading ? 'eos-icons:bubble-loading' : 'ic:round-cancel'}
                color="red"
              />
              Cancel
            </MenuItem>
          </MenuList>
        </CustomPopover>

        <Detail id={data?.id!} open={open} />
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);
