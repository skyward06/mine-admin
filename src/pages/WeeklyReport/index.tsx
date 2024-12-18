import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import WeeklyReports from 'src/sections/Reports/Weekly';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} / Weekly Reports`}</title>
      </Helmet>

      <WeeklyReports />
    </>
  );
}
