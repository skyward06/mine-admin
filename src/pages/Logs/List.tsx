import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import LogList from 'src/sections/Logs';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Log`}</title>
      </Helmet>

      <LogList />
    </>
  );
}
