import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  txData: zod
    .array(
      zod.object({
        txID: zod.string(),
      })
    )
    .optional()
    .nullable(),
});
