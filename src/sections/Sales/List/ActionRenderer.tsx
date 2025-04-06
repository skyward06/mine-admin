import type { CustomCellRendererProps } from '@ag-grid-community/react';

import dayjs from 'dayjs';
import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { today, isSaturday } from 'src/utils/format-time';

import { PERMISSIONS } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useAuthContext } from 'src/auth/hooks';

import Detail from './Detail';
import { useRemoveSale } from '../useApollo';

import type { Sale } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Sale>) => {
    const router = useRouter();
    const open = useBoolean();
    const confirm = useBoolean();

    const popover = usePopover();

    const last = dayjs(today()).startOf('week').add(-1, 'day');
    const { user } = useAuthContext();

    const disabled =
      user?.role?.sale === 7
        ? true
        : user?.role?.sale === PERMISSIONS.PAST_EDIT_PERMISSION.value
          ? dayjs(data?.orderedAt).isBefore(last)
          : user?.role?.sale === PERMISSIONS.EDITOR_PERMISSION.value &&
            !dayjs(data?.orderedAt).isBefore(last);

    const { loading, removeSale } = useRemoveSale();

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
                open.onTrue();
              }}
            >
              <Iconify icon="solar:eye-bold" color="gray" />
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push(paths.dashboard.sales.log(data?.id!));
              }}
            >
              <Iconify icon="ri:history-line" color="gray" />
              Log
            </MenuItem>
            {[
              PERMISSIONS.EDITOR_PERMISSION.value,
              PERMISSIONS.PAST_EDIT_PERMISSION.value,
              7,
            ].includes(user?.role?.sale!) && (
              <>
                <MenuItem
                  onClick={() => {
                    popover.onClose();
                    router.push(`${paths.dashboard.sales.edit(formatID(data?.ID ?? '', 'S'))}`);
                  }}
                  disabled={!disabled}
                >
                  <Iconify icon="solar:pen-2-bold" color="green" />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    popover.onClose();
                    confirm.onTrue();
                  }}
                  disabled={isSaturday()}
                >
                  <Iconify icon="bxs:coffee-togo" color="red" />
                  Delete
                </MenuItem>
              </>
            )}
          </MenuList>
        </CustomPopover>

        <Detail open={open} id={data?.id!} />

        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Delete"
          content={
            <>
              <Typography>This sale will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          }
          action={
            <LoadingButton
              variant="contained"
              color="error"
              loading={loading}
              onClick={async () => {
                const promise = await removeSale({ variables: { data: { id: data?.id ?? '' } } });
                const result = promise.data?.removeSale.result;

                if (result === 'success') {
                  toast.success('Sale removed successfully');
                } else {
                  toast.error('You are not allowed to remove this sale');
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
