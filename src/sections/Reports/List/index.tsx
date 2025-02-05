import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import Revenue from './Revenue';
import MetalListView from './Metals';
import WeeklyReports from './Weekly';
import OnepointMemberListView from './OnePointAway';
import { useGenerateWeeklyReports } from '../useApollo';

const TABS = [
  { value: 'revenue', label: 'Revenue', icon: <Iconify icon="mdi:non-profit" /> },
  {
    value: 'onePointAway',
    label: 'One Point Away',
    icon: <Iconify icon="f7:hand-point-right-fill" />,
  },
  { value: 'weekly', label: 'Weekly', icon: <Iconify icon="tabler:calendar-week-filled" /> },
  { value: 'metals', label: 'Metals', icon: <Iconify icon="icon-park-outline:heavy-metal" /> },
];

// ----------------------------------------------------------------------
export default function ReportView() {
  const tabs = useTabs('revenue');
  const navigate = useNavigate();

  const [all, setAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { loading: generateLoading, generateWeeklyReport } = useGenerateWeeklyReports();

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
    navigate(`${paths.dashboard.report.root}`, { replace: true });
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

  const handleGenerate = async () => {
    try {
      setAll(false);
      const { data } = await generateWeeklyReport({ variables: { data: { all: false } } });

      if (data) {
        toast.success('Successfully generated!');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  };

  const handleReGenerate = async () => {
    try {
      setAll(true);
      const { data } = await generateWeeklyReport({ variables: { data: { all: true } } });

      if (data) {
        toast.success('Successfully generated!');
      }
    } catch (error) {
      console.log('error => ', error);
    }
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
            <>
              {tabs.value === 'revenue' && (
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
              )}
              {tabs.value === 'weekly' && (
                <Box
                  display="grid"
                  columnGap={2}
                  sx={{ pr: 2, gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '45% 55%' } }}
                >
                  <LoadingButton
                    variant="contained"
                    startIcon={<Iconify icon="fluent-mdl2:generate" />}
                    loading={!all && generateLoading}
                    color="primary"
                    onClick={handleGenerate}
                    sx={{ mb: 1 }}
                  >
                    Generate
                  </LoadingButton>
                  <LoadingButton
                    variant="contained"
                    startIcon={<Iconify icon="streamline:ai-generate-variation-spark" />}
                    loading={all && generateLoading}
                    color="primary"
                    onClick={handleReGenerate}
                    sx={{ mb: 1 }}
                  >
                    ReGenerate
                  </LoadingButton>
                </Box>
              )}
            </>
          }
        />

        <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'revenue' && <Revenue />}

        {tabs.value === 'onePointAway' && <OnepointMemberListView />}

        {tabs.value === 'weekly' && <WeeklyReports />}

        {tabs.value === 'metals' && <MetalListView />}
      </DashboardContent>
    </>
  );
}
