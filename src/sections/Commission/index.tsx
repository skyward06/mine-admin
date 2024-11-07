import axios from 'axios';
import { useState } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { CONFIG } from 'src/config';
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
  const [loading, setLoading] = useState<boolean>(false);

  const openWeek = useBoolean();

  const handleExport = async () => {
    setLoading(true);

    const token = localStorage.getItem(CONFIG.storageTokenKey);

    const { data } = await axios.get(`${CONFIG.SITE_URL}/api/export-commissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    });

    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `commission_by_week.xlsx`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setLoading(false);
  };

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Commission"
        links={[{ name: 'Commission', href: paths.dashboard.commission.root }, { name: 'All' }]}
        action={
          <Stack direction="row" columnGap={2}>
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="uil:export" />}
              loading={loading}
              color="primary"
              onClick={handleExport}
            >
              Export
            </LoadingButton>
            <Button variant="contained" color="primary" onClick={() => openWeek.onTrue()}>
              Select Week
            </Button>
          </Stack>
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
