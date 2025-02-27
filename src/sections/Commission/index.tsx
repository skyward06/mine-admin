import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import Week from './Week';
import Member from './Member';
import Preview from './Preview';
import { useCalculateCommission } from './useApollo';

const TABS = [
  { value: 'week', label: 'Week', icon: <Iconify icon="stash:data-date-duotone" width={24} /> },
  {
    value: 'member',
    label: 'Member',
    icon: <Iconify icon="iconoir:user" width={24} />,
  },
  {
    value: 'preview',
    label: 'Preview',
    icon: <Iconify icon="fluent:preview-link-16-regular" width={24} />,
  },
];

export default function CommissionListView() {
  const { loading: calculationLoading, calculateCommission } = useCalculateCommission();
  const [query, { setQueryParams: setQuery }] = useQuery();
  const tabs = useTabs(query.tab ?? 'week');
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

  const handleTabChange = (event: React.SyntheticEvent, value: any) => {
    setQuery({ tab: value });
    tabs.onChange(event, value);
  };

  const handleCalculate = async () => {
    try {
      const { data } = await calculateCommission();

      if (data) {
        toast.success('Successfully calculated!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Commission"
        links={[{ name: 'Commission', href: paths.dashboard.commission.root }, { name: 'All' }]}
        action={
          <Box
            display="grid"
            columnGap={2}
            sx={{ pr: 4, gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '30% 36% 34%' } }}
          >
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => openWeek.onTrue()}
              sx={{ mb: 1 }}
            >
              Select Week
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="fluent:preview-link-16-regular" />}
              onClick={handleCalculate}
              loading={calculationLoading}
              sx={{ mb: 1 }}
            >
              Calculate
            </LoadingButton>
          </Box>
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'week' && <Week openWeek={openWeek} />}

      {tabs.value === 'member' && <Member openWeek={openWeek} />}

      {tabs.value === 'preview' && <Preview />}
    </DashboardContent>
  );
}
