import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import PromoCreate from 'src/sections/Promos/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Promo` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <PromoCreate />
    </>
  );
}
