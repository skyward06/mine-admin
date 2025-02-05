import { Helmet } from 'react-helmet-async';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import BalanceList from './Balance';
import Transactions from './Transactions';

const TABS = [
  {
    value: 'transactions',
    label: 'Transactions',
    icon: <Iconify icon="tabler:transaction-dollar" />,
  },
  { value: 'balance', label: 'Balance', icon: <Iconify icon="bx:transfer" /> },
];

// ----------------------------------------------------------------------
export default function BalanceView() {
  const tabs = useTabs('transactions');

  const router = useRouter();

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
  };

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: Balance`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading="Balance"
          links={[{ name: 'Balance' }, { name: 'List' }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
          action={
            <Button variant="contained" onClick={() => router.push(paths.dashboard.balance.new)}>
              Pay Miner
            </Button>
          }
        />

        <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'balance' && <BalanceList />}

        {tabs.value === 'transactions' && <Transactions />}
      </DashboardContent>
    </>
  );
}
