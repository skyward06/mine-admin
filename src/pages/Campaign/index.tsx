import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import Campaign from 'src/sections/Communication/Campaign/View';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Campaign`}</title>
      </Helmet>

      <Campaign />
    </>
  );
}
