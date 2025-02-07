import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { formatDateTime } from 'src/utils/format-time';
import { formatID, customizeFullName } from 'src/utils/helper';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { EmptyContent } from 'src/components/EmptyContent';

import { FileRecentItem } from './FileRecentItem';

import type { Sale } from './type';

interface Props {
  open: UseBooleanReturn;
  row: Sale;
}

export default function Detail({ open, row }: Props) {
  const { member, sponsorCnt, package: product, status, proof, isMetal, updatedAt } = row;

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 375 } }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6"> {formatID(row?.ID!, 'S')} </Typography>
          <Stack direction="row">
            <Typography>
              <Iconify
                icon="codicon:circle-filled"
                sx={{ color: status ? 'green' : 'text.disabled', mt: 0.3 }}
              />
            </Typography>
            <Typography variant="subtitle1">{status ? 'active' : 'inactive'}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">User</Typography>

          <Stack direction="row" justifyContent="space-between">
            <ListItemText
              primary={customizeFullName(member?.fullName ?? '')}
              secondary={member?.username}
              primaryTypographyProps={{ typography: 'subtitle1' }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
              }}
            />

            <Typography variant="body2">{formatDateTime(updatedAt)}</Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Package</Typography>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Product Name:
            </Typography>
            <Typography variant="body2">{product?.productName}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Hash Power:
            </Typography>
            <Typography variant="body2">{product?.token}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Amount:
            </Typography>
            <Typography variant="body2">{product?.amount}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Point:
            </Typography>
            <Typography variant="body2">{product?.point}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Free Share:
            </Typography>
            <Typography variant="body2">{sponsorCnt ? 'Yes' : 'No'}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Metal Peer Payment:
            </Typography>
            <Typography variant="body2">{isMetal ? 'Yes' : 'No'}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Visibility:
            </Typography>
            <Iconify
              icon={product?.enrollVisibility ? 'eva:eye-outline' : 'tabler:eye-off'}
              sx={{
                color: (theme) =>
                  product?.enrollVisibility
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
              }}
            />
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Note</Typography>
          <Typography variant="body2">{proof?.note}</Typography>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Reference Link</Typography>

          {proof?.reflinks?.map((link) => (
            <Stack direction="row" columnGap={1}>
              <Typography>{link?.linkType}:</Typography>
              <Typography
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                <Link to={link?.link ?? ''} target="_blank">
                  {link?.link}
                </Link>
              </Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Files</Typography>

          {isEmpty(proof?.files) ? (
            <EmptyContent />
          ) : (
            proof?.files?.map((file: any) => <FileRecentItem key={file.id} file={file} />)
          )}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}
