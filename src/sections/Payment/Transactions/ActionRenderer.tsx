import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';

import type { Transaction } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Transaction>) => {
    const open = useBoolean();
    const popover = usePopover();

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
          </MenuList>
        </CustomPopover>

        <Detail hash={data?.hash!} chain={data?.chain!} open={open} />
      </>
    );
  },
  (prev, next) => prev.data?.hash === next.data?.hash
);
