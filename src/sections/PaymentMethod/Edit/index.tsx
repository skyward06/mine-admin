import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchPayment } from '../useApollo';

// ----------------------------------------------------------------------
export default function PaymentEditView() {
  const params = useParams();

  const { loading, payment } = useFetchPayment(params?.id ?? '');

  const current = payment?.[0] ?? { id: '', name: '', visible: true };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!payment) {
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
          links={[{ name: 'Payment', href: paths.dashboard.paymentMethod.root }, { name: 'Edit' }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <EditForm current={current} />
      </DashboardContent>
    </>
  );
}
