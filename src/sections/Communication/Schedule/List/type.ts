import type { CampaignListType } from 'src/__generated__/graphql';

export type Schedule = {
  __typename?: 'ScheduleCampaign';
  id: string;
  when: string;
  sender: string;
  status: boolean;
  subject: string;
  lastRun?: any | null;
  nextRun?: any | null;
  createdAt?: any | null;
  listExtra?: string | null;
  templateId?: string | null;
  template?: { __typename?: 'EmailTemplate'; subject: string } | null;
  listType: CampaignListType;
};
