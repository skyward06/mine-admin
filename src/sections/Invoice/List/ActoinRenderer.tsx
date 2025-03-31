import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { InvoiceStatusEnum } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import { useMoveToPaid } from '../useApollo';

import type { Invoice } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Invoice>) => {
    const defaultValue = {
      id: 0,
      name: '',
      dueDate: new Date(),
      description: '',
      amountInCents: 0,
      status: InvoiceStatusEnum.Pending,
    };

    const open = useBoolean();
    const popover = usePopover();

    const { loading, moveToPaid } = useMoveToPaid();

    const handlePaid = async () => {
      try {
        const { data: result } = await moveToPaid({ variables: { data: { ID: data?.id ?? 0 } } });

        if (result) {
          toast.success('Successfully moved!');
          popover.onClose();
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const handleGenerate = async () => {
      try {
        console.log('here');
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
            <MenuItem
              onClick={async () => {
                await handlePaid();
              }}
              disabled={data?.status === InvoiceStatusEnum.Paid}
            >
              <Iconify icon={loading ? 'eos-icons:bubble-loading' : 'mdi:forward'} />
              Move to Paid
            </MenuItem>
            <MenuItem onClick={handleGenerate}>
              <Iconify icon="ri:ai-generate" />
              Regenerate
            </MenuItem>
          </MenuList>
        </CustomPopover>

        <Detail open={open} row={data ?? defaultValue} />
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);
