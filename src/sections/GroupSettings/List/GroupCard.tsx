import type { GroupSetting } from 'src/__generated__/graphql';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config';
import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/Image';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useRemoveGroupSettings } from '../useApollo';

// ----------------------------------------------------------------------

type Props = {
  group: GroupSetting;
};

export function GroupCard({ group }: Props) {
  const router = useRouter();

  const popover = usePopover();
  const confirm = useBoolean();

  const { loading, removeGroupSettings } = useRemoveGroupSettings();

  return (
    <>
      <Card sx={{ textAlign: 'center' }}>
        <IconButton
          color="inherit"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 9,
          }}
          onClick={popover.onOpen}
        >
          <Iconify icon="eva:more-vertical-fill" color="white" />
        </IconButton>

        <Box sx={{ position: 'relative' }}>
          <AvatarShape
            sx={{
              left: 0,
              right: 0,
              zIndex: 10,
              mx: 'auto',
              bottom: -26,
              position: 'absolute',
            }}
          />

          <Avatar
            alt={group.name}
            src={`${CONFIG.site.basePath}/assets/txc-logo.png`}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -32,
              mx: 'auto',
              position: 'absolute',
            }}
          />

          <Image
            src={`${CONFIG.site.basePath}/assets/background/texitcoin-background.png`}
            alt={`${CONFIG.site.basePath}/assets/background/texitcoin-background.png`}
            ratio="16/9"
            slotProps={{
              overlay: {
                background: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.3),
              },
            }}
          />
        </Box>

        <Stack
          onClick={() => router.push(paths.dashboard.groupSettings.edit(group.id))}
          sx={{
            cursor: 'pointer',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
        >
          <ListItemText
            sx={{
              mt: 6,
              mb: 1,
            }}
            primary={group.name}
            secondary={formatDate(group.limitDate)}
            primaryTypographyProps={{ typography: 'h6' }}
            secondaryTypographyProps={{
              typography: 'caption',
              component: 'span',
              mt: 0.5,
            }}
          />

          <Typography sx={{ mb: 2.5 }} variant="subtitle2">
            {group.sponsorBonusPackage?.productName}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          {group.groupSettingCommissionBonuses.map((bonus: any) => (
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              sx={{ py: 1, typography: 'caption' }}
            >
              <Typography variant="caption">Commission: {bonus.commission}</Typography>
              <Typography variant="caption">Left Point: {bonus.lPoint}</Typography>
              <Typography variant="caption">Right Point: {bonus.rPoint}</Typography>
            </Box>
          ))}
        </Box>
      </Card>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push(`${paths.dashboard.groupSettings.edit(group.id)}`);
            }}
          >
            <Iconify icon="solar:pen-2-bold" color="green" />
            Edit
          </MenuItem>
          <MenuItem onClick={confirm.onTrue}>
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
            <Typography>This Group will be removed permanently!</Typography>
            <Typography>Are you sure?</Typography>
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={loading}
            onClick={async () => {
              const promise = await removeGroupSettings({ variables: { data: { id: group.id } } });
              const result = promise.data?.removeGroupSetting.id;

              if (result === 'success') {
                toast.success('Group removed successfully');
              } else {
                toast.error('You are not allowed to remove this group');
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
}
