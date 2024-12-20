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
import { useRemoveProof } from '../useApollo';

import type { Proof } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Proof>) => {
    const router = useRouter();
    const open = useBoolean();
    const confirm = useBoolean();
    const popover = usePopover();

    const { loading, removeProof } = useRemoveProof();

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
                popover.onClose();
                router.push(`${paths.dashboard.proof.edit(data?.id ?? '')}`);
              }}
            >
              <Iconify icon="solar:pen-2-bold" color="green" />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                popover.onClose();
                open.onTrue();
              }}
            >
              <Iconify icon="solar:eye-bold" color="gray" />
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                popover.onClose();
                confirm.onTrue();
              }}
            >
              <Iconify icon="bxs:coffee-togo" color="red" />
              Delete
            </MenuItem>
          </MenuList>
        </CustomPopover>

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
