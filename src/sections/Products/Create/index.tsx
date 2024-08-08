import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import ProductCreateForm from './ProductCreateForm';

// ----------------------------------------------------------------------

export default function ProductCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new Product"
        links={[
          {
            name: 'Product',
            href: paths.dashboard.products.root,
          },
          { name: 'New Product' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <ProductCreateForm />
    </DashboardContent>
  );
}
