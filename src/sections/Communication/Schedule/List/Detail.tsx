import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { formatDateTime } from 'src/utils/format-time';

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
      </ScrollBar>
    </Drawer>
  );
}
