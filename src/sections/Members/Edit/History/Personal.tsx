import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useFetchMembers } from '../../useApollo';

export const Personal = () => {
  const params = useParams();
  const [children, setChildren] = useState<any>();

  const { id } = params;

  const { members, fetchMembers } = useFetchMembers();

  const member = members[0];

  useEffect(() => {
    setChildren(
      member?.placementChildren?.reduce(
        (prev, save) => ({ ...prev, [save?.placementPosition ?? '']: save?.fullName }),
        {}
      )
    );
  }, [member]);

  useEffect(() => {
    fetchMembers({ variables: { filter: { id: id ?? '' } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Grid xl={12}>
      <Card sx={{ mt: 2, p: 3 }}>
        <Typography variant="h6" sx={{ pb: 2 }}>
          About
        </Typography>
        <Stack>
          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Full Name:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.fullName}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Username:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.username}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Sponsor:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.sponsor?.fullName}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Email:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.email}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Mobile:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.mobile}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Address:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.primaryAddress}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Address 2:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.secondaryAddress}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                City:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.city}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                ZIP Code:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.zipCode}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                State:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.state}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Asset ID:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.assetId}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Placement Parent:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{member?.placementParent?.fullName}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Miner Left:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{children?.LEFT}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
            <Stack width={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Miner Right:
              </Typography>
            </Stack>
            <Stack width={1}>
              <Typography variant="body2">{children?.RIGHT}</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack sx={{ mt: 2 }}>
          {member?.memberWallets?.map((item) => (
            <Stack sx={{ pb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {item?.payout?.method}
              </Typography>
              <Typography variant="body2">{item?.address}</Typography>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Grid>
  );
};
