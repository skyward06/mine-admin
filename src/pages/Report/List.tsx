import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import OnepointMemberList from 'src/sections/Reports/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Reports`}</title>
      </Helmet>

      <OnepointMemberList />
    </>
  );
}
