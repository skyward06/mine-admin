import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import CreateForm from '../EditForm';

// ----------------------------------------------------------------------

export default function ShareAccountCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Share accounts"
        links={[
          {
            name: 'Shared accounts',
            href: paths.dashboard.shared.root,
          },
          { name: 'New share' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <CreateForm />
    </DashboardContent>
  );
}
