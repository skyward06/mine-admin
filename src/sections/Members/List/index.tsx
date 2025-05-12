import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { Label, type LabelColor } from 'src/components/Label';

import MemberListTable from './MemberListTable';
import { useFetchMembersStats } from '../useApollo';

import type { AllowState } from './type';

const TABS: { value: AllowState; label: string; color: LabelColor }[] = [
  { value: 'APPROVED', label: 'Approved', color: 'info' },
  { value: 'PENDING', label: 'Pending', color: 'success' },
  { value: 'PAID', label: 'Paid', color: 'secondary' },
  { value: 'GRAVEYARD', label: 'Graveyard', color: 'warning' },
  { value: 'BLOCKED', label: 'Blocked', color: 'error' },
];

export default function MemberListView() {
  const tabs = useTabs('APPROVED');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { setQueryParams: setQuery }] = useQuery<any>();

  const [filter, setFilter] = useState<any>({ allowState: 'APPROVED' });

  const { data: statsData, fetchMemberStats } = useFetchMembersStats();

  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
    tabs.onChange(event, newValue);
    setFilter({ allowState: newValue });
    setQuery({});
  };

  useEffect(() => {
    fetchMemberStats({
      variables: {
        approveFilter: { allowState: 'APPROVED' },
        pendingFilter: { allowState: 'PENDING' },
        graveyardFilter: { allowState: 'GRAVEYARD' },
        paidFilter: { allowState: 'PAID' },
        blockFilter: { allowState: 'BLOCKED' },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.value]);

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Miner"
        links={[{ name: 'Miner', href: paths.dashboard.members.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.members.new}
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Miner
          </Button>
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />
      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <Box textAlign="center">
          <Tabs
            value={tabs.value}
            onChange={handleTabChange}
            orientation="vertical"
            sx={{
              minWidth: 180,
              borderRight: 1,
              borderColor: 'divider',
              [`& .MuiTabs-flexContainer`]: { gap: 0 },
              [`& .MuiTabs-flexContainerVertical`]: {
                padding: '16px',
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                label={
                  <Stack direction="row" flexGrow={1}>
                    {tab.label}
                  </Stack>
                }
                value={tab.value}
                icon={
                  <Label
                    variant={(tab.value === filter.allowState && 'filled') || 'soft'}
                    color={tab.color}
                  >
                    {statsData ? statsData[tab.value].total! : 0}
                  </Label>
                }
              />
            ))}
          </Tabs>
        </Box>

        <MemberListTable filter={filter} />
      </Card>
    </DashboardContent>
  );
}
