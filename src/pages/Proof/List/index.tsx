import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import ProofList from 'src/sections/Proof/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Proof`}</title>
      </Helmet>

      <ProofList />
    </>
  );
}
