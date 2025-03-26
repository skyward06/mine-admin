import type { CampaignMember, CampaignListType } from 'src/__generated__/graphql';

export type Campaign = {
  __typename?: 'Campaign';
  id: string;
  body: string;
  subject: string;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
  listExtra?: string | null;
  listType: CampaignListType;
  recipients?: Array<CampaignMember> | null;
};
