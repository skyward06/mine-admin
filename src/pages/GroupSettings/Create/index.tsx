import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import GroupSettingsCreate from 'src/sections/GroupSettings/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Group` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <GroupSettingsCreate />
    </>
  );
}
