import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  minute: zod.string().refine((val) => /^[0-9]{1,2}$|^\*$/.test(val), {
    message: 'Minute must be a number between 0 and 59 or "*"',
  }),
  hour: zod.string().refine((val) => /^[0-9]{1,2}$|^\*$/.test(val), {
    message: 'Hour must be a number between 0 and 23 or "*"',
  }),
  dayOfMonth: zod.string().refine((val) => /^[0-9]{1,2}$|^\*$/.test(val), {
    message: 'Day of month must be between 1 and 31 or "*"',
  }),
  month: zod.string().refine((val) => /^[0-9]{1,2}$|^\*$/.test(val), {
    message: 'Month must be between 1 and 12 or "*"',
  }),
  dayOfWeek: zod.string().refine((val) => /^[0-6]{1}$|^\*$/.test(val), {
    message: 'Day of week must be between 0 and 6 (0 = Sunday) or "*"',
  }),
});
