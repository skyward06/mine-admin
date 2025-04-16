import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useRefreshBalance } from '../useApollo';

import type { Address } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Address>) => {
    const popover = usePopover();

    const { loading, refreshBalances } = useRefreshBalance();

    const handleRefresh = async () => {
      try {
        await refreshBalances({
          variables: { data: { address: data?.address!, type: data?.type! } },
        });
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
            <MenuItem onClick={handleRefresh}>
              <Iconify icon={loading ? 'eos-icons:bubble-loading' : 'mdi:refresh'} />
              Refresh
            </MenuItem>
          </MenuList>
        </CustomPopover>
      </>
    );
  },
  (prev, next) => prev.data?.address === next.data?.address
);
