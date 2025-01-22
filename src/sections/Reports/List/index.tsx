import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import Revenue from './Revenue';
import OnepointMemberListView from './OnePointAway';

const TABS = [
  { value: 'revenue', label: 'Revenue', icon: <Iconify icon="mdi:non-profit" /> },
  {
    value: 'onePointAway',
    label: 'One Point Away',
    icon: <Iconify icon="f7:hand-point-right-fill" />,
  },
];

// ----------------------------------------------------------------------
export default function ReportView() {
  const tabs = useTabs('revenue');
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
  };

  const handleExport = async () => {
    setLoading(true);

    const token = localStorage.getItem(CONFIG.storageTokenKey);

    const { data } = await axios.get(`${CONFIG.SITE_URL}/api/export-member-in-out-revenues`, {
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
    a.download = `revenue.xlsx`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setLoading(false);
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
          action={
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="uil:export" />}
              loading={loading}
              color="primary"
              onClick={handleExport}
              sx={{ mb: 1 }}
            >
              Export
            </LoadingButton>
          }
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
