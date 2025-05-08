import { useEffect } from 'react';

import { useParams } from 'src/routes/hooks';

import { LoadingScreen } from 'src/components/loading-screen';

import EditForm from '../EditForm';
import { useFetchAutoCampaignById } from '../../useApollo';

import type { AutoCampaign } from '../List/type';

export default function TemplateEditView() {
  const params = useParams();
  const { loading, autoCampaign, fetchAutoCampaignById } = useFetchAutoCampaignById();

  useEffect(() => {
    fetchAutoCampaignById({ variables: { data: { id: params?.id ?? '' } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const defaultValue: AutoCampaign = {
    id: '',
    sender: '',
    subject: '',
    templateId: '',
    approvedCommission: true,
  };

  return <>{loading ? <LoadingScreen /> : <EditForm current={autoCampaign ?? defaultValue} />}</>;
}
