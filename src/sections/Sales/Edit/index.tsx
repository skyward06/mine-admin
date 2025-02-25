import { parseInt } from 'lodash';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import SaleGeneral from './General';
import { useFetchSaleByID } from '../useApollo';

// ----------------------------------------------------------------------
export default function SaleEditView() {
  // Loading state including first initial render

  const params = useParams();

  const { id } = params;
  const { loading, sale } = useFetchSaleByID(parseInt(id?.split('-')[1] ?? '', 10));

  if (loading) {
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
          links={[{ name: 'Sale', href: paths.dashboard.sales.root }, { name: id }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <SaleGeneral currentSale={sale} />
      </DashboardContent>
    </>
  );
}
