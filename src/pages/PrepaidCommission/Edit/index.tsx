import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import PrepaidEditView from 'src/sections/PrepaidCommission/Edit';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} / New Prepayment` };

export default function PrepaidEditPage() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <PrepaidEditView />
    </>
  );
}
