import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import EditForm from '../EditForm';

// ----------------------------------------------------------------------

export default function ProductCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Set a new wallet"
        links={[
          {
            name: 'Wallet',
            href: paths.dashboard.setAddress.root,
          },
          { name: 'New Wallet' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <EditForm />
    </DashboardContent>
  );
}
