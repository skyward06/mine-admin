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
import { useRemoveProof } from '../useApollo';

import type { Proof } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Proof>) => {
    const router = useRouter();
    const open = useBoolean();
    const confirm = useBoolean();

    const { loading, removeProof } = useRemoveProof();

    return (
      <>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton
            color="primary"
            onClick={() => {
              console.log('path => ', paths.dashboard.proof.edit(data?.id ?? ''));
              router.push(`${paths.dashboard.proof.edit(data?.id ?? '')}`);
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

        <Detail open={open} row={data} />

        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Delete"
          content={
            <>
              <Typography>This proof will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          }
          action={
            <LoadingButton
              variant="contained"
              color="error"
              loading={loading}
              onClick={async () => {
                const promise = await removeProof({ variables: { data: { id: data?.id ?? '' } } });
                const result = promise.data?.removeProof.result;

                if (result === 'success') {
                  toast.success('Proof removed successfully');
                } else {
                  toast.error('You are not allowed to remove this proof');
                }

                confirm.onFalse();
              }}
            >
              Confirm
            </LoadingButton>
          }
        />
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);
