import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import UserCreateForm from './UserCreateForm';

// ----------------------------------------------------------------------

export default function UserCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new admin"
        links={[
          {
            name: 'Admin',
            href: paths.dashboard.user.root,
          },
          { name: 'New admin' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <UserCreateForm />
    </DashboardContent>
  );
}
