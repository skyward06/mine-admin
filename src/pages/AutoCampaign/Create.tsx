import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import AutoCampaignCreate from 'src/sections/Communication/AutoCampaign/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Auto Campaign` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <AutoCampaignCreate />
    </>
  );
}
