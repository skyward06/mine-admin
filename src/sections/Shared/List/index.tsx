import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import SharedList from './Table';
import ShareAccount from './ShareAccount';

export default function SharedListView() {
  const open = useBoolean();

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Shared"
        links={[{ name: 'Shared', href: paths.dashboard.shared.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="entypo:link" />}
              onClick={open.onTrue}
            >
              Link
            </Button>
            <Button
              component={RouterLink}
              href={paths.dashboard.shared.new}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New
            </Button>
          </Stack>
        }
      />

      <SharedList />
      <ShareAccount open={open} />
    </DashboardContent>
  );
}
