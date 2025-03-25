import { CampaignListType } from 'src/__generated__/graphql';

export const parseType = (campaignListType: CampaignListType): string => {
  switch (campaignListType) {
    case CampaignListType.All:
      return 'All';
    case CampaignListType.Custom:
      return 'Custom';
    case CampaignListType.Group:
      return 'Groups';
    case CampaignListType.WeeklySponsor:
      return 'Weekly Sponsor';
    default:
      return campaignListType;
  }
};
