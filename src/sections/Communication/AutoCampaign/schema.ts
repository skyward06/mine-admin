import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  sender: zod
    .string()
    .min(1, { message: 'Sender is required' })
    .refine((value) => value.endsWith('minetxc.com'), {
      message: 'Sender must include minetxc.com as a suffix',
    }),
  subject: zod.string().min(1, { message: 'Subject is required' }),
  approvedCommission: zod.boolean().default(true),
});
