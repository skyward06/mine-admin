import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { PERMISSIONS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import StatisticsTable from './Statistics';

export default function RewardListView() {
  const { user } = useAuthContext();

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Reward"
        links={[{ name: 'Reward', href: paths.dashboard.members.root }, { name: 'List' }]}
        action={
          user?.role?.sale !==
          (PERMISSIONS.NONE_PERMISSION.value && PERMISSIONS.VIEWER_PERMISSION.value) ? (
            <Button
              component={RouterLink}
              href={paths.dashboard.reward.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Reward
            </Button>
          ) : null
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <StatisticsTable />
    </DashboardContent>
  );
}
