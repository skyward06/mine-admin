import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import RoleList from 'src/sections/Role/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Role`}</title>
      </Helmet>

      <RoleList />
    </>
  );
}
