import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import PrepaidCreateForm from '../EditForm';

// ----------------------------------------------------------------------

export default function PrepaidCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new Prepayment"
        links={[
          {
            name: 'Prepayment',
            href: paths.dashboard.prepaidCommission.root,
          },
          { name: 'New Prepayment' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <PrepaidCreateForm />
    </DashboardContent>
  );
}
