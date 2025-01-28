import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchPromos } from '../useApollo';

// ----------------------------------------------------------------------
export default function PromoEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { fetchPromos, loading, promos, called } = useFetchPromos();

  const { id: promoId } = params;

  const fetchProduct = useCallback(() => {
    fetchPromos({ variables: { filter: { id: promoId } } });
  }, [fetchPromos, promoId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  const promo = promos?.[0];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!promo) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: ${`${promo.code}`}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading={`${promo.code}`}
          links={[{ name: 'Promo', href: paths.dashboard.promos.root }, { name: `${promo.code}` }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <EditForm current={promo} />
      </DashboardContent>
    </>
  );
}
