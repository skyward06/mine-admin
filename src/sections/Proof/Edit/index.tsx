import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchProofs } from '../useApollo';

// ----------------------------------------------------------------------
export default function ProofEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const { fetchProofs, loading, proofs, called } = useFetchProofs();

  const { id: productId } = params;

  const fetchProduct = useCallback(() => {
    fetchProofs({ variables: { filter: { id: productId } } });
  }, [fetchProofs, productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  const proof = proofs?.[0];

  if (isLoading) {
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

        <EditForm current={proof} />
      </DashboardContent>
    </>
  );
}
