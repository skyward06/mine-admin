import type { MemberLog } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { isEmpty } from 'lodash';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import Empty from './Empty';
import Difference from './Difference';

interface Props {
  log: MemberLog;
  defaultStyles: any;
  open: UseBooleanReturn;
}

export default function LogDrawer({ open, defaultStyles, log }: Props) {
  const { who, when, status, action, before, after } = log;

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      PaperProps={{ sx: { width: action === 'update' ? 1100 : 550, background: '#fff' } }}
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
              {status ? (
                <Iconify icon="ep:success-filled" color="#22C55E" />
              ) : (
                <Iconify icon="uis:times-circle" color="#B71D18" />
              )}
            </Typography>
          </Stack>

          <Typography>{fDateTime(when, 'MM/DD/YYYY hh:mm:ss')}</Typography>
          {action === 'update' ? (
            <Stack direction="row" columnGap={2}>
              <Stack width={0.5}>
                {isEmpty(after) ? (
                  <Empty before={before} action="before" />
                ) : (
                  <Difference
                    before={before}
                    after={after}
                    action="before"
                    compare
                    defaultStyles={defaultStyles}
                  />
                )}
              </Stack>
              <Stack width={0.5}>
                {isEmpty(after) ? (
                  <Empty before={before} action="after" />
                ) : (
                  <Difference
                    before={before}
                    after={after}
                    action="after"
                    compare
                    defaultStyles={defaultStyles}
                  />
                )}
              </Stack>
            </Stack>
          ) : (
            <Difference
              before={before}
              after={after}
              action={action === ('create' || 'signup') ? 'after' : 'before'}
              defaultStyles={defaultStyles}
            />
          )}
        </Paper>
      </ScrollBar>
    </Drawer>
  );
}
