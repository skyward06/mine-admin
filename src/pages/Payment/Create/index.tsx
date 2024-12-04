import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import PaymentCreate from 'src/sections/Payment/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Payment` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <PaymentCreate />
    </>
  );
}
