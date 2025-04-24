import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import { useMoveToWip, useMoveToSolve } from '../useApollo';

import type { BugReport } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<BugReport>) => {
    const open = useBoolean();
    const popover = usePopover();

    const { loading: wipLoading, moveToWip } = useMoveToWip();
    const { loading: solveLoading, moveToSolve } = useMoveToSolve();

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
              <Iconify icon="solar:eye-bold" color="gray" />
              View
            </MenuItem>
            <MenuItem
              onClick={async () => {
                try {
                  const { data: result } = await moveToSolve({
                    variables: { data: { id: data?.id! } },
                  });

                  if (result) {
                    toast.success('Successfully Move to Done');
                    popover.onClose();
                  }
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              <Iconify
                icon={solveLoading ? 'eos-icons:bubble-loading' : 'weui:done2-filled'}
                color="green"
              />
              Move to Done
            </MenuItem>
            <MenuItem
              onClick={async () => {
                try {
                  const { data: result } = await moveToWip({
                    variables: { data: { id: data?.id! } },
                  });

                  if (result) {
                    toast.success('Successfully Move to Progress');
                    popover.onClose();
                  }
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              <Iconify
                icon={wipLoading ? 'eos-icons:bubble-loading' : 'mdi:progress-upload'}
                color="brown"
              />
              Move to Progress
            </MenuItem>
          </MenuList>
        </CustomPopover>

        <Detail open={open} id={data?.id!} />
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);
