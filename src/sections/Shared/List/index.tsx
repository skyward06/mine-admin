import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import SharedList from './Table';

export default function SharedListView() {
  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Shared"
        links={[{ name: 'Shared', href: paths.dashboard.shared.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.shared.new}
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New
          </Button>
        }
      />

      <SharedList />
    </DashboardContent>
  );
}
