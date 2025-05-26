import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

import { formatDate } from 'src/utils/format-time';

import { ChartWidget } from 'src/components/CustomChart';

import { useFetchMemberStatistics } from '../../useApollo';

export const Reward = () => {
  const { id } = useParams();

  const { loading, statistics } = useFetchMemberStatistics({ memberId: id });

  return (
    <Grid sx={{ mr: 2, mt: 2 }}>
      <Card>
        <CardHeader title="Reward" />
        <ChartWidget
          loading={loading}
          chart={{
            categories: statistics.map((item) => `${formatDate(item?.issuedAt!)}`).reverse(),
            series: [
              {
                name: 'TXC Shared',
                data: statistics.map((item) => (item?.txcShared ?? 0) / 10 ** 8).reverse(),
              },
              {
                name: 'Hash Power',
                data: statistics.map((item) => Number(item?.hashPower.toFixed(3))).reverse(),
              },
            ],
            options: {
              plotOptions: {
                bar: {
                  columnWidth: '80%',
                },
              },
              yaxis: {
                labels: {
                  formatter(val) {
                    return `${Math.floor(val)}`;
                  },
                },
              },
            },
          }}
          height={492}
          type="bar"
          card
        />
      </Card>
    </Grid>
  );
};
