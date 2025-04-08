import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  name: zod.string({ required_error: 'Name is required' }),
  limitDate: zod.string({ required_error: 'Limit Date is required' }),
  sponsorBonusPackageId: zod.string().optional().nullable(),
  rollSponsorBonusPackageId: zod.string().optional().nullable(),
  commissionDefaults: zod.array(zod.string({ required_error: 'Commission Defaults is required' })),
  groupSettingCommissionBonuses: zod.array(
    zod.object({
      lPoint: zod.number(),
      rPoint: zod.number(),
      commission: zod.number(),
      qPackageId: zod.string({ required_error: 'Package is requried' }),
      uPackageId: zod.string().optional().nullable(),
    })
  ),
});
