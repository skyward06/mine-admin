import { useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';

import { useTabs } from 'src/hooks/use-tabs';

import ChartWidget from 'src/components/ChartWidget';
import { CustomTabs } from 'src/components/custom-tabs';

import { useFetchCommissionByPeriod } from '../useApollo';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
];

export default function MemberReward() {
  const tabs = useTabs('week');
  const theme = useTheme();

  const renderTabs = (
    <CustomTabs
      value={tabs.value}
      onChange={tabs.onChange}
      variant="fullWidth"
      slotProps={{ tab: { px: 0 } }}
    >
      {TABS.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
    </CustomTabs>
  );

  const { loading, commission, fetchCommissionByPeriod } = useFetchCommissionByPeriod();

  useEffect(() => {
    fetchCommissionByPeriod({ variables: { data: { type: tabs.value } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);
  return (
    <Card>
      {renderTabs}

      <ChartWidget
        loading={loading}
        chart={{
          categories: commission!.map((item) => item.base).reverse(),
          series: [
            {
              name: 'Commission',
              data: commission.map((item) => item.commission).reverse(),
            },
          ],
          options: {
            xaxis: {
              tooltip: { enabled: false },
              tickAmount: 10,
              categories: commission!.map((item) => item.base).reverse(),
            },
            yaxis: {
              labels: {
                formatter(val) {
                  return `${Math.floor(val)}`;
                },
              },
            },
          },
          colors: [alpha(theme.palette.primary.dark, 0.8)],
        }}
        card
      />
    </Card>
  );
}
