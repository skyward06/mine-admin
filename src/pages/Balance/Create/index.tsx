import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import BalanceCreate from 'src/sections/Balance/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Payment` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <BalanceCreate />
    </>
  );
}
