import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useRemoveAutoCampaign } from '../../useApollo';

import type { AutoCampaign } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<AutoCampaign>) => {
    const confirm = useBoolean();
    const popover = usePopover();

    const router = useRouter();

    const { loading, removeAutoCampaign } = useRemoveAutoCampaign();

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
                router.push(paths.dashboard.autoCampaign.edit(data?.id!));
              }}
            >
              <Iconify icon="gravity-ui:pencil-to-square" color="green" />
              Edit
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
                const { data: result } = await removeAutoCampaign({
                  variables: { data: { id: data?.id ?? '' } },
                });

                if (result) {
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
