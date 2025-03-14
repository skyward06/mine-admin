import type { EntityLog } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { formatDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import Difference from './Difference';

interface Props {
  log: EntityLog;
  open: UseBooleanReturn;
}

export default function LogDrawer({ open, log }: Props) {
  const { who, when, status, action, before, after } = log;

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: 380,
            sm: 600,
          },
          background: '#fff',
        },
      }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
          p: 3,
        }}
      >
        <Paper>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{who}</Typography>
            <Typography>
              {status === 'success' ? (
                <Iconify icon="ep:success-filled" color="#22C55E" />
              ) : (
                <Iconify icon="uis:times-circle" color="#B71D18" />
              )}
            </Typography>
          </Stack>

          <Typography>{formatDateTime(when)}</Typography>

          <Difference
            action={action}
            before={action === 'create' ? {} : before}
            after={action === 'delete' ? {} : after}
          />
        </Paper>
      </ScrollBar>
    </Drawer>
  );
}
