import { Helmet } from 'react-helmet-async';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import Revenue from './Revenue';
import OnepointMemberListView from './OnePointAway';

const TABS = [
  { value: 'revenue', label: 'Revenue', icon: <Iconify icon="bi:diagram-3" /> },
  { value: 'onePointAway', label: 'One Point Away', icon: <Iconify icon="bi:currency-exchange" /> },
];

// ----------------------------------------------------------------------
export default function ReportView() {
  const tabs = useTabs('revenue');

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
  };

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: Report`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading="Report"
          links={[{ name: 'Report' }, { name: 'List' }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'revenue' && <Revenue />}

        {tabs.value === 'onePointAway' && <OnepointMemberListView />}
      </DashboardContent>
    </>
  );
}
