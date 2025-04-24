import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import BugList from 'src/sections/Bug/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Bug`}</title>
      </Helmet>

      <BugList />
    </>
  );
}
