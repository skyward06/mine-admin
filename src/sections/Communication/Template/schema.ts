import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  body: zod.string().optional().nullable(),
  subject: zod.string({ required_error: 'Subject is required' }),
  description: zod.string().optional().nullable(),
});
