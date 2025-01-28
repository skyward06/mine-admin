import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import PromosList from 'src/sections/Promos/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Promos`}</title>
      </Helmet>

      <PromosList />
    </>
  );
}
