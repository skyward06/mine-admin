import type { EntityLog } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { isEmpty } from 'lodash';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { formatDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import Empty from './Empty';
import Difference from './Difference';

interface Props {
  log: EntityLog;
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
      PaperProps={{
        sx: {
          width: {
            xs: 375,
            sm: action === 'update' ? 1100 : 375,
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
          {action === 'update' ? (
            <Grid container>
              <Grid lg={6} sm={12} sx={{ p: 1 }}>
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
              </Grid>
              <Grid lg={6} sm={12} sx={{ p: 1 }}>
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
              </Grid>
            </Grid>
          ) : (
            <Difference
              before={before}
              after={after}
              action={action === 'create' || action === 'signup' ? 'after' : 'before'}
              defaultStyles={defaultStyles}
            />
          )}
        </Paper>
      </ScrollBar>
    </Drawer>
  );
}
