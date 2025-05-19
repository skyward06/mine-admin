import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useQuery, useAgQuery } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import ExportButton from 'src/components/ExportButton';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { SearchInput } from 'src/components/SearchInput';
import { Label, type LabelColor } from 'src/components/Label';

import MemberListTable from './MemberListTable';
import { useFetchMembersStats } from '../useApollo';

import type { AllowState } from './type';

const TABS: { value: AllowState; label: string; color: LabelColor }[] = [
  { value: 'APPROVED', label: 'Approved', color: 'info' },
  { value: 'PENDING', label: 'Pending', color: 'success' },
  { value: 'PAID', label: 'Paid', color: 'secondary' },
  { value: 'GRAVEYARD', label: 'Graveyard', color: 'warning' },
  { value: 'ADDED', label: 'Added', color: 'warning' },
  { value: 'BLOCKED', label: 'Blocked', color: 'error' },
];

export default function MemberListView() {
  const tabs = useTabs('APPROVED');

  const token = localStorage.getItem(CONFIG.storageTokenKey) ?? '';

  const [query, { setQueryParams: setQuery }] = useQuery<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { setFilter }] = useAgQuery();

  const [customFilter, setCustomFilter] = useState<any>({ allowState: 'APPROVED' });

  const { data: statsData, fetchMemberStats } = useFetchMembersStats();

  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
    tabs.onChange(event, newValue);
    setCustomFilter({ allowState: newValue });
  };

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilter({});
      setQuery({
        ...query,
        filter: {
          OR: [
            { email: { contains: value, mode: 'insensitive' } },
            { assetId: { contains: value, mode: 'insensitive' } },
            { username: { contains: value, mode: 'insensitive' } },
            { fullName: { contains: value, mode: 'insensitive' } },
            { mobile: { contains: value, mode: 'insensitive' } },
            { primaryAddress: { contains: value, mode: 'insensitive' } },
          ],
        },
      });
    },
    [setQuery, setFilter, query]
  );

  useEffect(() => {
    fetchMemberStats({
      variables: {
        approveFilter: { allowState: 'APPROVED' },
        pendingFilter: { allowState: 'PENDING' },
        graveyardFilter: { allowState: 'GRAVEYARD' },
        addedFilter: { allowState: 'ADDED' },
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

      <Card sx={{ borderRadius: '10px 10px 0 0' }}>
        <Stack direction="row">
          <Stack width={1}>
            <SearchInput
              search={customFilter.search}
              onSearchChange={handleSearchChange}
              sx={{ p: 1.5 }}
            />
          </Stack>
          <Stack width={0.1} sx={{ p: 1.5 }}>
            <ExportButton target="export-members" token={token} />
          </Stack>
        </Stack>
      </Card>

      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
          borderRadius: '0 0 10px 10px',
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
                    variant={(tab.value === customFilter.allowState && 'filled') || 'soft'}
                    color={tab.color}
                  >
                    {statsData ? statsData[tab.value].total! : 0}
                  </Label>
                }
              />
            ))}
          </Tabs>
        </Box>

        <MemberListTable customFilter={customFilter} />
      </Card>
    </DashboardContent>
  );
}
