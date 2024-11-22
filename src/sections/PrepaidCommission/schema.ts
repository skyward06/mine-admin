import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  note: zod.string().optional().nullable(),
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
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
