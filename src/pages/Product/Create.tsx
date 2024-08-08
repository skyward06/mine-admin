import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import ProductCreate from 'src/sections/Products/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} - New Product` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <ProductCreate />
    </>
  );
}
