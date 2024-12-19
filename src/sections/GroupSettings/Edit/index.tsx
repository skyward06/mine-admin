import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchGroupSettings } from '../useApollo';

// ----------------------------------------------------------------------
export default function ProofEditView() {
  const params = useParams();

  const { loading, groupSettings, fetchGroupSettings } = useFetchGroupSettings();

  const current = groupSettings?.[0] ?? {};

  useEffect(() => {
    fetchGroupSettings({ variables: { filter: { id: params.id } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!groupSettings) {
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
          links={[{ name: 'Group', href: paths.dashboard.proof.root }, { name: current.name }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <EditForm current={current} />
      </DashboardContent>
    </>
  );
}
