import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import Orders from './Order';
import Addresses from './Address';
import Transactions from './Transactions';

const TABS = [
  {
    value: 'orders',
    label: 'Orders',
    icon: <Iconify icon="material-symbols-light:order-approve" />,
  },
  {
    value: 'addresses',
    label: 'Addresses',
    icon: <Iconify icon="f7:wallet-fill" />,
  },
  {
    value: 'transactions',
    label: 'Transactions',
    icon: <Iconify icon="tabler:transaction-dollar" />,
  },
];

export default function Payment() {
  const tabs = useTabs('orders');
  const navigate = useNavigate();

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
    navigate(`${paths.dashboard.payment.root}`, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: Payment`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading="Payment"
          links={[{ name: 'Payment', href: paths.dashboard.payment.root }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'orders' && <Orders />}

        {tabs.value === 'addresses' && <Addresses />}

        {tabs.value === 'transactions' && <Transactions />}
      </DashboardContent>
    </>
  );
}
