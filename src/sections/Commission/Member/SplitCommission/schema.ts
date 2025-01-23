import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  autoCreate: zod.boolean().default(false),
  splitWays: zod
    .array(
      zod.object({
        way: zod.string(),
        money: zod.number().refine((value) => value % 1000 === 0, {
          message: 'Money must be a multiple of 1000',
        }),
        note: zod.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
});
