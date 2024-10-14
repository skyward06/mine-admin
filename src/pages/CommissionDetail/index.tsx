import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import CommissionDetail from 'src/sections/Commission/Detail';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Commission`}</title>
      </Helmet>

      <CommissionDetail />
    </>
  );
}
