import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { COMMISSION_TYPE } from 'src/consts';
import { ConfirmationStatus } from 'src/__generated__/graphql';

import { Label } from 'src/components/Label';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useUpdateCommissionStatus } from '../useApollo';

interface Props {
  ids: string[];
  status: string;
}

export default function SelectedBar({ ids, status }: Props) {
  const popover = usePopover();

  const { updateCommissionStatus } = useUpdateCommissionStatus();

  return (
    <>
      <Label
        variant="soft"
        color="success"
        sx={{
          borderRadius: '0 !important',
          py: 3,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
      </Label>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            disabled={status !== COMMISSION_TYPE.PENDING.label.toLowerCase()}
            onClick={async () => {
              const { data } = await updateCommissionStatus({
                variables: { data: { ids, status: ConfirmationStatus.Approved } },
              });

              if (data) {
                toast.message('Successfully Approved!');
              } else {
                toast.message('Something went wrong!');
              }

              popover.onClose();
            }}
          >
            <Iconify icon="mage:check-circle-fill" color="green" />
            Approve
          </MenuItem>
          <MenuItem
            disabled={status !== COMMISSION_TYPE.PENDING.label.toLowerCase()}
            onClick={async () => {
              const { data: result } = await updateCommissionStatus({
                variables: { data: { ids, status: ConfirmationStatus.Declined } },
              });

              if (result) {
                toast.message('Successfully Declined!');
              } else {
                toast.message('Something went wrong!');
              }

              popover.onClose();
            }}
          >
            <Iconify icon="material-symbols:cancel" color="red" />
            Decline
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
