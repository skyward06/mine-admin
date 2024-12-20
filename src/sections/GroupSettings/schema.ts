import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  name: zod.string({ required_error: 'Name is required' }),
  limitDate: zod.string({ required_error: 'Limit Date is required' }),
  sponsorBonusPackageId: zod.string().optional().nullable(),
  rollSponsorBonusPackageId: zod.string().optional().nullable(),
  groupSettingCommissionBonuses: zod.array(
    zod.object({
      commission: zod.number(),
      lPoint: zod.number(),
      rPoint: zod.number(),
    })
  ),
});
