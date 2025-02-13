import type { Role } from 'src/__generated__/graphql';

import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchRoles } from '../useApollo';

// ----------------------------------------------------------------------
export default function RoleEditView() {
  const { loading, roles } = useFetchRoles();

  const current = roles[0] as Omit<Role, 'frontAction'>;

  if (loading) {
    return <LoadingScreen />;
  }

  if (!current) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading="Edit"
          links={[{ name: 'Role', href: paths.dashboard.roles.root }, { name: 'Edit' }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <EditForm current={current} />
      </DashboardContent>
    </>
  );
}
