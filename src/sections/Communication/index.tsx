import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import MemberListView from './List';
import { TemplateListView } from './Template';

export default function CommunicationView() {
  const TABS = [
    { value: 'Member List', label: 'Member List', icon: <Iconify icon="majesticons:users-line" /> },
    {
      value: 'Email Templates',
      label: 'Email Templates',
      icon: <Iconify icon="fluent:mail-template-16-filled" />,
    },
    {
      value: 'Campaigns',
      label: 'Campaigns',
      icon: <Iconify icon="tabler:brand-campaignmonitor" />,
    },
  ];

  const tabs = useTabs('Member List');

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
  };

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Communication"
        links={[{ name: 'Communication' }, { name: tabs.value }]}
        sx={{
          mb: { xs: 2, md: 3 },
        }}
      />

      <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'Member List' && <MemberListView />}
      {tabs.value === 'Email Templates' && <TemplateListView />}
    </DashboardContent>
  );
}
