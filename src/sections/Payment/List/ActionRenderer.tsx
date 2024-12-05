import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';

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

    const { loading, removePayment } = useRemovePayment();

    return (
      <>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton
            color="primary"
            onClick={() => {
              router.push(`${paths.dashboard.payment.edit(data?.id ?? '')}`);
            }}
          >
            <Iconify icon="solar:pen-2-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View" placement="top" arrow>
          <IconButton color="default" onClick={open.onTrue}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top" arrow>
          <IconButton
            color="error"
            onClick={() => {
              confirm.onTrue();
            }}
          >
            <Iconify icon="bxs:coffee-togo" />
          </IconButton>
        </Tooltip>

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
