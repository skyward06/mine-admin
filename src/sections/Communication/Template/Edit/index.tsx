import { useEffect } from 'react';

import { useParams } from 'src/routes/hooks';

import { LoadingScreen } from 'src/components/loading-screen';

import Editor from '../Editor';
import { useFetchTemplateById } from '../../useApollo';

export default function TemplateEditView() {
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
    description: '',
  };

  return <>{loading ? <LoadingScreen /> : <Editor current={template ?? defaultValue} />}</>;
}
