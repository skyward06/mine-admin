import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { parseFilterModel } from 'src/utils/parseFilter';

import { CONFIG } from 'src/config';
import { PERMISSIONS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import ExportButton from 'src/components/ExportButton';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import Week from './Week';
import Price from './Price';
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
  const [query, { setQueryParams: setQuery }] = useQuery();
  const tabs = useTabs(query.tab ?? 'week');

  const { filter, sort = 'ID' } = query;

  const { user } = useAuthContext();
  const { loading: calculationLoading, calculateCommission } = useCalculateCommission();

  const openWeek = useBoolean();
  const openPrice = useBoolean();

  const token = localStorage.getItem(CONFIG.storageTokenKey) ?? '';

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
          <Box display="flex" columnGap={2}>
            <ExportButton
              target="commissions"
              variant="contained"
              token={token}
              sx={{ mb: 1 }}
              params={{ filter: parseFilterModel({}, filter ?? {}), sort: Object.keys(sort)[0] }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => openWeek.onTrue()}
              sx={{ mb: 1 }}
            >
              <Iconify icon="tabler:calendar-week" sx={{ mr: 0.5 }} /> Select Week
            </Button>
            {(user?.role?.commission === PERMISSIONS.COMMISSOIN_CALCULATION_PERMISSION.value ||
              user?.role?.commission === 7) && (
              <>
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
                {tabs.value === 'member' && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 1 }}
                    onClick={openPrice.onTrue}
                  >
                    <Iconify icon="solar:tag-price-outline" sx={{ mr: 0.5 }} />
                    Pay TXC
                  </Button>
                )}
              </>
            )}
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

      <Price open={openPrice} />
    </DashboardContent>
  );
}
