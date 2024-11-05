import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import MemberList from 'src/sections/Reports/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Reports`}</title>
      </Helmet>

      <MemberList />
    </>
  );
}
