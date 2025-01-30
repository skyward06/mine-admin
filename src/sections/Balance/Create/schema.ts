import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  amountInCents: zod.number({ required_error: 'Amount is required' }).int(),
  date: zod.string({ required_error: 'Date is required' }),
  extra1: zod.string().optional().nullable(),
  extra2: zod.string().optional().nullable(),
  note: zod.string().optional().nullable(),
});
