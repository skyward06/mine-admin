import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import SaleGeneral from './General';
import { useFetchSales } from '../useApollo';

// ----------------------------------------------------------------------
export default function SaleEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const { fetchSales, loading, sales, called } = useFetchSales();

  const { id } = params;

  useEffect(() => {
    fetchSales({ variables: { filter: { id } } });
  }, [fetchSales, id]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  const sale = sales?.[0];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!sale) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: Sale`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading="Sale Edit"
          links={[{ name: 'Sale', href: paths.dashboard.sales.root }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <SaleGeneral currentSale={sale} />
      </DashboardContent>
    </>
  );
}
