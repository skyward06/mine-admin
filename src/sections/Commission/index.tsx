import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import Week from './Week';
import Member from './Member';

const TABS = [
  { value: 'week', label: 'Week', icon: <Iconify icon="stash:data-date-duotone" width={24} /> },
  {
    value: 'member',
    label: 'Member',
    icon: <Iconify icon="iconoir:user" width={24} />,
  },
];

export default function CommissionListView() {
  const tabs = useTabs('week');

  const openWeek = useBoolean();

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Commission"
        links={[{ name: 'Commission', href: paths.dashboard.commission.root }, { name: 'All' }]}
        action={
          <Button variant="contained" color="primary" onClick={() => openWeek.onTrue()}>
            Select Week
          </Button>
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 2, md: 3 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'week' && <Week openWeek={openWeek} />}

      {tabs.value === 'member' && <Member openWeek={openWeek} />}
    </DashboardContent>
  );
}
