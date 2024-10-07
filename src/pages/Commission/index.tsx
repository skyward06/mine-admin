import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import CommissionList from 'src/sections/Commission';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Commission`}</title>
      </Helmet>

      <CommissionList />
    </>
  );
}
