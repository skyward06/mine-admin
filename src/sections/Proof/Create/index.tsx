import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import CreateForm from '../EditForm';

// ----------------------------------------------------------------------

export default function ProofCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new proof"
        links={[
          {
            name: 'Proof',
            href: paths.dashboard.proof.root,
          },
          { name: 'New Proof' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <CreateForm />
    </DashboardContent>
  );
}
