import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import PrepaidCreate from 'src/sections/PrepaidCommission/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Prepayment` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <PrepaidCreate />
    </>
  );
}
