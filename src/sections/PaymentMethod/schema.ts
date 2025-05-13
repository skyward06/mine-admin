import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  name: zod.string({ required_error: 'Payment Method is required' }),
});
