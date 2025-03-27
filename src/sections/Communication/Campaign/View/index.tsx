import { useEffect } from 'react';
import { useParams } from 'react-router';

import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';

import EmailTemplateView from 'src/components/Template';
import { LoadingScreen } from 'src/components/loading-screen';

import EmailView from './Emails';
import Overview from './Overview';
import PieChart from './PieChart';
import { useFetchCampaignById } from '../../useApollo';

export default function CampaignView() {
  const { id } = useParams();

  const { loading, campaign, fetchCampaign } = useFetchCampaignById();

  useEffect(() => {
    fetchCampaign({ variables: { data: { id: id! } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <DashboardContent>
          <Overview
            subject={campaign?.subject!}
            listType={campaign?.listType!}
            listExtra={campaign?.listExtra}
          />

          <Grid container>
            <Grid md={6}>
              <EmailView emails={campaign?.recipients ?? []} />
            </Grid>
            <Grid md={6} sx={{ p: 2 }}>
              <PieChart loading={loading} emails={campaign?.recipients ?? []} />
              <EmailTemplateView body={campaign?.body ?? ''} />
            </Grid>
          </Grid>
        </DashboardContent>
      )}
    </>
  );
}
