import { useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import Editor from './Editor';
import { useFetchTemplateById } from '../useApollo';

export default function Template() {
  const params = useParams();
  const { loading, template, fetchTemplateById } = useFetchTemplateById();

  useEffect(() => {
    fetchTemplateById({ variables: { data: { id: params?.id ?? '' } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const defaultValue = {
    id: '',
    body: '',
    subject: '',
    sampleVars: '',
    description: '',
    templateName: '',
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <DashboardContent>
          <Breadcrumbs
            heading="HTML Editor"
            links={[{ name: 'Template', href: paths.dashboard.template.root }, { name: 'Edit' }]}
            sx={{
              mb: { xs: 2, md: 3 },
            }}
          />

          <Editor current={template ?? defaultValue} />
        </DashboardContent>
      )}
    </>
  );
}
