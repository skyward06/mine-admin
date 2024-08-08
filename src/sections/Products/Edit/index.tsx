import { Helmet } from 'react-helmet-async';
import { useLazyQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { FETCH_PACKAGES_QUERY } from '../query';

// ----------------------------------------------------------------------
export default function ProductEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const [fetchProductQuery, { loading, data, called }] = useLazyQuery(FETCH_PACKAGES_QUERY);

  const { id: productId } = params;

  const fetchProduct = useCallback(() => {
    fetchProductQuery({ variables: { filter: { id: productId } } });
  }, [fetchProductQuery, productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  const product = data?.packages?.packages?.[0];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!product) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: ${`${product.productName}`}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading={`${product.productName}`}
          links={[
            { name: 'Product', href: paths.dashboard.products.root },
            { name: `${product.productName}` },
          ]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <EditForm current={product} />
      </DashboardContent>
    </>
  );
}
