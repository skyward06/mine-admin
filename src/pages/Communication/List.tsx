import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import CommunicationList from 'src/sections/Communication/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Communication`}</title>
      </Helmet>

      <CommunicationList />
    </>
  );
}
