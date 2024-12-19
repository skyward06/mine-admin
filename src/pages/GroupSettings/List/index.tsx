import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import GroupSettingsList from 'src/sections/GroupSettings/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Group Settings`}</title>
      </Helmet>

      <GroupSettingsList />
    </>
  );
}
