import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import ShareAccountCreate from 'src/sections/Shared/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / Shared` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <ShareAccountCreate />
    </>
  );
}
