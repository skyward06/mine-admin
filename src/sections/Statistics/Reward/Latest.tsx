import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { formatDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import { useFetchLatestReward } from 'src/sections/dashboard/useApollo';

export default function Latest() {
  const { loading, latest, fetchReward } = useFetchLatestReward();

  useEffect(() => {
    fetchReward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader title="Latest Reward" />

      <ScrollBar sx={{ minHeight: 260 }}>
        <Box
          sx={{
            p: 3,
            py: 1,
            gap: 3,
            minWidth: 360,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {loading ? (
            <Paper sx={{ p: 3 }}>
              <Skeleton variant="text" sx={{ fontSize: 25 }} />
              <Skeleton variant="text" sx={{ fontSize: 25 }} />
              <Skeleton variant="text" sx={{ fontSize: 25 }} />
              <Skeleton variant="text" sx={{ fontSize: 25 }} />
              <Skeleton variant="text" sx={{ fontSize: 25 }} />
            </Paper>
          ) : (
            <Stack sx={{ mt: 2 }}>
              {latest.map((item) => (
                <Grid
                  container
                  sx={{
                    gap: 1,
                    minWidth: 120,
                    px: 3,
                    py: 1,
                    alignItems: 'center',
                  }}
                >
                  <Grid md={2} xs={12}>
                    <Stack direction="row" columnGap={1} sx={{ alignItems: 'center' }}>
                      <Tooltip title="New Blocks" arrow placement="top">
                        <Iconify icon="clarity:block-line" width={18} />
                      </Tooltip>
                      <Typography variant="body1">{item.newBlocks}</Typography>
                    </Stack>
                  </Grid>
                  <Grid md={2} xs={12}>
                    <Stack direction="row" columnGap={1} sx={{ alignItems: 'center' }}>
                      <Tooltip title="Total Miners" arrow placement="top">
                        <Iconify icon="stash:user-group" width={18} />
                      </Tooltip>
                      <Typography variant="body1">{item.totalMembers}</Typography>
                    </Stack>
                  </Grid>
                  <Grid md={4} xs={12}>
                    <Stack direction="row" columnGap={1} sx={{ alignItems: 'center' }}>
                      <Tooltip title="TXC Shared" arrow placement="top">
                        <Avatar
                          src={`${CONFIG.SITE_PATH}/assets/icons/brands/txc.png`}
                          sx={{ width: 15, height: 15 }}
                        />
                      </Tooltip>
                      <Typography variant="body1">{item.txcShared}</Typography>
                    </Stack>
                  </Grid>
                  <Grid md={2} xs={12}>
                    <Stack direction="row" columnGap={1} sx={{ alignItems: 'center' }}>
                      <Tooltip title="Issued At" arrow placement="top">
                        <Iconify icon="stash:data-date-duotone" width={18} />
                      </Tooltip>
                      <Typography variant="body1">{formatDate(item.issuedAt)}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          )}
        </Box>
      </ScrollBar>
    </Card>
  );
}
