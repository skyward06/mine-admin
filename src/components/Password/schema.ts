import { z as zod } from 'zod';

import { PASSWORD_REG_EXP } from 'src/consts';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod
  .object({
    oldPassword: zod.string().min(1, { message: 'Current password is required!' }),
    newPassword: zod
      .string()
      .min(1, { message: 'New password is required!' })
      .min(8, { message: 'Password must be at least 8 characters!' })
      .regex(PASSWORD_REG_EXP, {
        message: 'Password must include uppercase, lowercase, number, and special character!',
      }),
    confirmPassword: zod.string().min(1, { message: 'Confirm Password is required!' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });
