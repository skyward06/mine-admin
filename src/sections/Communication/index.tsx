import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useQuery, useRouter } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import Schedule from './Schedule/List';
import { MemberListView } from './List';
import CreateCampaign from './Campaign/Send';
import { CampaignListView } from './Campaign';
import { TemplateListView } from './Template';
import CreateSchedule from './Schedule/Create';

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
  {
    value: 'Schedule',
    label: 'Schedule',
    icon: <Iconify icon="gg:alarm" />,
  },
];

export default function CommunicationView() {
  const campaignOpen = useBoolean();
  const scheduleOpen = useBoolean();
  const router = useRouter();
  const tabs = useTabs('Member List');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { setQueryParams: setQuery }] = useQuery();

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
    setQuery({});
  };

  return (
    <>
      <DashboardContent>
        <Breadcrumbs
          heading="Communication"
          links={[{ name: 'Communication' }, { name: tabs.value }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
          action={
            <>
              {tabs.value === 'Campaigns' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    campaignOpen.onTrue();
                    setQuery({});
                  }}
                >
                  <Iconify icon="gridicons:add-outline" sx={{ mr: 0.5 }} /> Create & Send Campaign
                </Button>
              )}
              {tabs.value === 'Email Templates' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    router.push(paths.dashboard.template.new);
                  }}
                >
                  <Iconify icon="gridicons:add-outline" sx={{ mr: 0.5 }} /> Add Email Template
                </Button>
              )}
              {tabs.value === 'Schedule' && (
                <Button variant="contained" color="primary" onClick={scheduleOpen.onTrue}>
                  <Iconify icon="gridicons:add-outline" sx={{ mr: 0.5 }} />
                  Create Schedule
                </Button>
              )}
            </>
          }
        />

        <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'Member List' && <MemberListView />}
        {tabs.value === 'Email Templates' && <TemplateListView />}
        {tabs.value === 'Campaigns' && <CampaignListView />}
        {tabs.value === 'Schedule' && <Schedule />}
      </DashboardContent>

      <CreateCampaign open={campaignOpen} />

      <CreateSchedule open={scheduleOpen} />
    </>
  );
}
