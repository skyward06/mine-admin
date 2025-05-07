import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { formatDate, formatDateTime } from 'src/utils/format-time';

import { CAMPAIGN_LIST_TYPE } from 'src/consts';

import { ScrollBar } from 'src/components/ScrollBar';

import type { Schedule } from './type';

interface Props {
  current: Schedule | undefined;
  open: UseBooleanReturn;
}

export default function Detail({ open, current }: Props) {
  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 375 } }}
    >
      <ScrollBar sx={{ borderRadius: 1 }}>
        <Stack direction="row" justifyContent="space-between" p={2}>
          <Typography>{formatDateTime(current?.createdAt ?? '')}</Typography>
          <Typography fontWeight="bold">{current?.status ? 'Enabled' : 'Disabled'}</Typography>
        </Stack>

        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">Info</Typography>

          <Stack direction="row" columnGap={2}>
            <Stack width={0.3} fontSize={14} color="text.disabled">
              Subject:
            </Stack>
            <Stack width={1} fontSize={14}>
              {current?.subject}
            </Stack>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Stack width={0.3} fontSize={14} color="text.disabled">
              Sender:
            </Stack>
            <Stack width={1} fontSize={14}>
              {current?.sender}
            </Stack>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Stack width={0.3} fontSize={14} color="text.disabled">
              listType:
            </Stack>
            <Stack width={1} fontSize={14}>
              {CAMPAIGN_LIST_TYPE[current?.listType!]}
            </Stack>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Stack width={0.3} fontSize={14} color="text.disabled">
              Last Run:
            </Stack>
            <Stack width={1} fontSize={14}>
              {current?.lastRun ? formatDate(current.lastRun) : 'Not yet'}
            </Stack>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Stack width={0.3} fontSize={14} color="text.disabled">
              Next Run:
            </Stack>
            <Stack width={1} fontSize={14}>
              {formatDate(current?.nextRun ?? '')}
            </Stack>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Stack width={0.3} fontSize={14} color="text.disabled">
              When:
            </Stack>
            <Stack width={1} fontSize={14}>
              {current?.when}
            </Stack>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Stack width={0.3} fontSize={14} color="text.disabled">
              Template:
            </Stack>
            <Stack width={1} fontSize={14}>
              {current?.template?.subject}
            </Stack>
          </Stack>
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}
