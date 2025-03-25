import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import TemplateCreate from 'src/sections/Communication/Template/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Template` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <TemplateCreate />
    </>
  );
}
