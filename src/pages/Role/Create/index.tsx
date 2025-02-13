import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import RoleCreate from 'src/sections/Role/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Role` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <RoleCreate />
    </>
  );
}
