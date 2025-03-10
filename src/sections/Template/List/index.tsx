import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import TemplateTable from './Table';

export default function Create() {
  return (
    <DashboardContent>
      <Breadcrumbs
        heading="HTML Editor"
        links={[{ name: 'Template', href: paths.dashboard.template.root }, { name: 'list' }]}
        sx={{
          mb: { xs: 2, md: 3 },
        }}
      />

      <TemplateTable />
    </DashboardContent>
  );
}
