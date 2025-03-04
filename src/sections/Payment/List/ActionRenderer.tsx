import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Detail from './Detail';
import { useRemovePayment } from '../useApollo';

import type { PaymentMethod } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<PaymentMethod>) => {
    const defaultValue = {
      id: '',
      name: '',
      visible: true,
    };
    const router = useRouter();

    const open = useBoolean();
    const confirm = useBoolean();
    const popover = usePopover();

    const { loading, removePayment } = useRemovePayment();

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
            <MenuItem onClick={open.onTrue}>
              <Iconify icon="solar:eye-bold" />
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push(`${paths.dashboard.payment.edit(data?.id ?? '')}`);
              }}
            >
              <Iconify icon="solar:pen-2-bold" />
              Edit
            </MenuItem>
            <MenuItem onClick={confirm.onTrue}>
              <Iconify icon="bxs:coffee-togo" />
              Delete
            </MenuItem>
          </MenuList>
        </CustomPopover>

        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Delete"
          content={
            <>
              <Typography>This payment will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          }
          action={
            <LoadingButton
              variant="contained"
              color="error"
              loading={loading}
              onClick={async () => {
                const promise = await removePayment({
                  variables: { data: { id: data?.id ?? '' } },
                });
                const result = promise.data?.removePaymentMethod.result;

                if (result === 'success') {
                  toast.success('Payment removed successfully');
                } else {
                  toast.error('You are not allowed to remove this payment');
                }

                confirm.onFalse();
              }}
            >
              Confirm
            </LoadingButton>
          }
        />

        <Detail open={open} row={data ?? defaultValue} />
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);
