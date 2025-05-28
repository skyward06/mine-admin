import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import SharedList from 'src/sections/Shared/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Shared`}</title>
      </Helmet>

      <SharedList />
    </>
  );
}
