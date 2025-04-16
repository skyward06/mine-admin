import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import Payment from 'src/sections/Payment';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Payment`}</title>
      </Helmet>

      <Payment />
    </>
  );
}
