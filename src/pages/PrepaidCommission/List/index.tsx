import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import PrepaidCommissionList from 'src/sections/PrepaidCommission/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Prepaid Commission`}</title>
      </Helmet>

      <PrepaidCommissionList />
    </>
  );
}
