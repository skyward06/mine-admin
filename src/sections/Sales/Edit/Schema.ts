import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  paymentMethod: zod.string({ required_error: 'Payment Method is required' }),
  status: zod.boolean({ required_error: 'Status is required' }).default(true),
  packageId: zod.string({ required_error: 'Package is required' }),
  note: zod.string().optional().nullable(),
  isMetal: zod.boolean().default(false),
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
