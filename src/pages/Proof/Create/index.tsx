import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import ProofCreate from 'src/sections/Proof/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Proof` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <ProofCreate />
    </>
  );
}
