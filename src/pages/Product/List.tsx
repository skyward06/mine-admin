import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import ProductList from 'src/sections/Products/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} - Products`}</title>
      </Helmet>

      <ProductList />
    </>
  );
}
