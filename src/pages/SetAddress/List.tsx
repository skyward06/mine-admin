import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import SetAddressList from 'src/sections/SetAddress/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Set Address`}</title>
      </Helmet>

      <SetAddressList />
    </>
  );
}
