import type { CampaignMember } from 'src/__generated__/graphql';

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

interface Props {
  loading: boolean;
  emails: CampaignMember[];
}

export default function PieChart({ loading, emails }: Props) {
  const theme = useTheme();

  const chartColors = [
    hexAlpha(theme.palette.success.main, 0.8),
    hexAlpha(theme.palette.secondary.main, 0.8),
    hexAlpha(theme.palette.info.main, 0.8),
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: ['Open', 'Not Open', 'Failed'],
    stroke: { width: 0 },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
    tooltip: {
      custom: ({ seriesIndex, w }) => {
        const data = w.globals.series[seriesIndex];
        const legend = w.globals.seriesNames[seriesIndex];
        const color = w.globals.colors[seriesIndex];

        return `<div style="background: #ffffff; color: #6a7987;"><div style="display: flex; padding: 10px;">
        <div style="margin-right: 8px; width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; margin-top: 4px;">
        </div>
        <div><span style="color: #637381; margin-right: 5px;">${legend}:</span> <span style="font-weight: bold;">${data}</span></div></div></div>`;
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: true },
    },
  });

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader title="Status" />
      {loading ? (
        <Paper sx={{ p: 3 }}>
          <Skeleton variant="text" sx={{ fontSize: 26 }} />
          <Skeleton variant="text" sx={{ fontSize: 26 }} />
          <Skeleton variant="text" sx={{ fontSize: 26 }} />
          <Skeleton variant="text" sx={{ fontSize: 26 }} />
          <Skeleton variant="text" sx={{ fontSize: 26 }} />
          <Skeleton variant="text" sx={{ fontSize: 26 }} />
          <Skeleton variant="text" sx={{ fontSize: 26 }} />
        </Paper>
      ) : (
        <Chart
          type="pie"
          series={[
            emails.filter((item) => item.open).length,
            emails.filter((item) => item.sent).length - emails.filter((item) => item.open).length,
            emails.filter((item) => !item.sent).length,
          ]}
          options={chartOptions}
          width={250}
          height={250}
          sx={{ my: 3, mx: 'auto' }}
        />
      )}
    </Card>
  );
}
