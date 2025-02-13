import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import CreateForm from '../EditForm';

// ----------------------------------------------------------------------

export default function RoleCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new Role"
        links={[
          {
            name: 'Role',
            href: paths.dashboard.roles.root,
          },
          { name: 'New Role' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <CreateForm />
    </DashboardContent>
  );
}
