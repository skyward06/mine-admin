import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import CreateForm from '../EditForm';

// ----------------------------------------------------------------------

export default function PaymentCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new payment"
        links={[
          {
            name: 'Payment',
            href: paths.dashboard.paymentMethod.root,
          },
          { name: 'New Payment' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <CreateForm />
    </DashboardContent>
  );
}
