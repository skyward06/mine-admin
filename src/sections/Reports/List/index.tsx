import dayjs from 'dayjs';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config';
import { PERMISSIONS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import ExportButton from 'src/components/ExportButton';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import Revenue from './Revenue';
import Special from './Special';
import MetalListView from './Metals';
import WeeklyReports from './Weekly';
import SponsorListView from './Sponsor';
import OnepointMemberListView from './OnePointAway';
import { useGenerateWeeklyReports } from '../useApollo';

// ----------------------------------------------------------------------
export default function ReportView() {
  const openWeek = useBoolean();
  const navigate = useNavigate();
  const tabs = useTabs('revenue');
  const { search } = useLocation();

  const { user } = useAuthContext();

  const token = localStorage.getItem(CONFIG.storageTokenKey) ?? '';

  const TABS = [
    { value: 'revenue', label: 'Revenue', icon: <Iconify icon="mdi:non-profit" /> },
    {
      value: 'onePointAway',
      label: 'One Point Away',
      icon: <Iconify icon="f7:hand-point-right-fill" />,
    },
    { value: 'weekly', label: 'Weekly', icon: <Iconify icon="tabler:calendar-week-filled" /> },
    { value: 'sponsors', label: 'Sponsors', icon: <Iconify icon="carbon:user-sponsor" /> },
    {
      value: 'special-report',
      label: 'Special Report',
      icon: <Iconify icon="uil:window-restore" />,
    },
    {
      value: 'peer-acceptable',
      label: 'Peer Acceptable',
      icon: <Iconify icon="healthicons:i-documents-accepted-outline-24px" />,
    },
  ];

  if (
    user?.role?.sale !== (PERMISSIONS.VIEWER_PERMISSION.value && PERMISSIONS.NONE_PERMISSION.value)
  ) {
    TABS.push({
      value: 'metals',
      label: 'Metals',
      icon: <Iconify icon="icon-park-outline:heavy-metal" />,
    });
  }

  const [all, setAll] = useState<boolean>(false);

  const { loading: generateLoading, generateWeeklyReport } = useGenerateWeeklyReports();

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
    navigate(`${paths.dashboard.report.root}`, { replace: true });
  };

  const handleGenerate = async () => {
    try {
      setAll(false);
      const { data } = await generateWeeklyReport({ variables: { data: { all: false } } });

      if (data) {
        toast.success('Successfully generated!');
      }
    } catch (error) {
      toast.error(error.message);
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
      toast.error(error.message);
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
                <ExportButton
                  target="export-member-in-out-revenues"
                  token={token}
                  variant="contained"
                  sx={{ mb: 1 }}
                />
              )}
              {tabs.value === 'weekly' && (
                <Stack direction="row" columnGap={2}>
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
                </Stack>
              )}
              {tabs.value === 'sponsors' && (
                <Stack direction="row" columnGap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon="tabler:calendar-week" />}
                    onClick={openWeek.onTrue}
                    sx={{ mb: 1 }}
                  >
                    Select Week
                  </Button>
                  <ExportButton
                    target={`export-sponsors/byweek/${formatDate(`${new URLSearchParams(search).get('weekStartDate') ?? dayjs().utc().startOf('week')}`, 'YYYY-MM-DD')}`}
                    token={token}
                    variant="contained"
                    sx={{ mb: 1 }}
                  />
                </Stack>
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

        {tabs.value === 'special-report' && <Special />}

        {tabs.value === 'onePointAway' && <OnepointMemberListView />}

        {tabs.value === 'weekly' && <WeeklyReports />}

        {tabs.value === 'metals' && <MetalListView />}

        {tabs.value === 'sponsors' && <SponsorListView openWeek={openWeek} />}
      </DashboardContent>
    </>
  );
}
