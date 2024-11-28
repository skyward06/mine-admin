import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchProof } from '../useApollo';

// ----------------------------------------------------------------------
export default function ProofEditView() {
  const params = useParams();

  const { loading, proof } = useFetchProof(params?.id ?? '');

  const current = proof?.[0] ?? {};

  if (loading) {
    return <LoadingScreen />;
  }

  if (!proof) {
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
          links={[{ name: 'Proof', href: paths.dashboard.proof.root }, { name: 'Edit' }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <EditForm current={current} />
      </DashboardContent>
    </>
  );
}
