import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import BalanceList from 'src/sections/Balance/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Balance`}</title>
      </Helmet>

      <BalanceList />
    </>
  );
}
