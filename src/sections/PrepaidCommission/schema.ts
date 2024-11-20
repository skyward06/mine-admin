import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  pkgL: zod.number({ required_error: 'pkgL is required' }).default(0),
  pkgR: zod.number({ required_error: 'pkgR is required' }).default(0),
  commission: zod.number({ required_error: 'Commission is required' }).default(0),
  note: zod.string().optional().nullable(),
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  weekStartDate: zod.string({ required_error: 'WeekStartDate is required' }),
  payments: zod
    .array(
      zod.object({
        txId: zod.string(),
        txType: zod.string(),
      })
    )
    .optional()
    .nullable(),
  reflinks: zod
    .array(
      zod.object({
        linkType: zod.string(),
        link: zod.string(),
      })
    )
    .optional()
    .nullable(),
});
