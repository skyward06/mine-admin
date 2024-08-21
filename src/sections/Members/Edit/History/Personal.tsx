import { useParams } from 'react-router-dom';
import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { FETCH_MEMBERS_QUERY } from '../../query';

export const Personal = () => {
  const params = useParams();

  const { id } = params;

  const { data } = useGraphQuery(FETCH_MEMBERS_QUERY, {
    variables: {
      filter: { id: id ?? '' },
    },
  });

  const member = data?.members?.members?.[0];

  return (
    <Grid xl={12}>
      <Card sx={{ mr: 2, mt: 2, p: 3 }}>
        <Typography variant="h6" sx={{ pb: 2 }}>
          About
        </Typography>
        <Grid container>
          <Grid md={12} xl={6}>
            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Full Name:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.fullName}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Username:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.username}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Sponsor:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.sponsor?.fullName}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Email:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.email}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Mobile:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.mobile}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Address:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.primaryAddress}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Address 2:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.secondaryAddress}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  City:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.city}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  ZIP Code:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.zipCode}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  State:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.state}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
              <Stack width={0.3}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Asset ID:
                </Typography>
              </Stack>
              <Stack width={1}>
                <Typography variant="body2">{member?.assetId}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid md={12} xl={6}>
            {member?.memberWallets?.map((item) => (
              <Stack sx={{ pb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {item?.payout?.method}
                </Typography>
                <Typography variant="body2">{item?.address}</Typography>
              </Stack>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
