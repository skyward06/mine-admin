import { z as zod } from 'zod';

import { CampaignListType } from 'src/__generated__/graphql';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  body: zod.string({ required_error: 'Body is required' }),
  subject: zod.string({ required_error: 'Subject is required' }),
  listExtra: zod.string().optional().nullable(),
  listType: zod.enum([
    CampaignListType.All,
    CampaignListType.Group,
    CampaignListType.Custom,
    CampaignListType.WeeklySponsor,
  ]),
});
