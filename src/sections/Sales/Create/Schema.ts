import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  paymentMethod: zod.string({ required_error: 'Payment Method is required' }),
  status: zod.number({ required_error: 'Status is required' }).default(1),
  note: zod.string().optional().nullable(),
  isMetal: zod.boolean().default(true),
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
