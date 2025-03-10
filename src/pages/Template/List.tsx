import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import Template from 'src/sections/Template/List';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Template`}</title>
      </Helmet>

      <Template />
    </>
  );
}
