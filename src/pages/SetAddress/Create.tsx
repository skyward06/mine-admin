import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import SetAddressCreate from 'src/sections/SetAddress/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New SetAddress` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <SetAddressCreate />
    </>
  );
}
