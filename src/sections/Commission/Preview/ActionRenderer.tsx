import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import Dialog from '@mui/material/Dialog';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import PlacementTreeView from '../Member/Placement';

import type { WeeklyCommission } from '../type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<WeeklyCommission>) => {
    const detailOpen = useBoolean();
    const placementOpen = useBoolean();

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
          </MenuList>
        </CustomPopover>

        <Detail open={detailOpen} row={data ?? ({} as WeeklyCommission)} />

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
