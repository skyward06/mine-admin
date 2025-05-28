import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchShareAccount } from '../useApollo';

// ----------------------------------------------------------------------
export default function ProofEditView() {
  const params = useParams();

  const { loading, shareAccount, fetchShareAccount } = useFetchShareAccount();

  useEffect(() => {
    fetchShareAccount({ variables: { data: { id: params?.id! } } });
  }, [params, fetchShareAccount]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading="Edit"
          links={[{ name: 'Share account', href: paths.dashboard.shared.root }, { name: 'Edit' }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <EditForm current={shareAccount} />
      </DashboardContent>
    </>
  );
}
