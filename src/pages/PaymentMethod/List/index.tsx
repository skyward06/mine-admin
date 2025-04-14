import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import PaymentList from 'src/sections/PaymentMethod/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Payment`}</title>
      </Helmet>

      <PaymentList />
    </>
  );
}
