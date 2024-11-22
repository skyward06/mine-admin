import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import PrepaidEditForm from '../EditForm';
import { useFetchPrepaid } from '../useApollo';

// ----------------------------------------------------------------------

export default function PrepaidEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const { loading, called, prepaid, fetchPrepaid } = useFetchPrepaid();

  const { id } = params;

  const fetchData = useCallback(() => {
    fetchPrepaid({ variables: { filter: { id } } });
  }, [fetchPrepaid, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!prepaid) {
    return <Navigate to={paths.notFound} replace />;
  }

  const current = prepaid?.[0];

  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Edit a Prepayment"
        links={[
          {
            name: 'Prepayment',
            href: paths.dashboard.prepaidCommission.root,
          },
          { name: `${current?.commissionId}` },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <PrepaidEditForm current={current} />
    </DashboardContent>
  );
}
