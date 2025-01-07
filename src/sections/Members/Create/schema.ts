import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  firstName: zod.string({ required_error: 'First Name is required' }),
  lastName: zod.string({ required_error: 'Last Name is required' }),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  mobile: zod.string({ required_error: 'Mobile is required' }),
  city: zod.string({ required_error: 'City is required' }),
  zipCode: zod.string({ required_error: 'ZIPCode is required' }),
  state: zod.string({ required_error: 'State is required' }),
  primaryAddress: zod.string({ required_error: 'Address is required' }),
  secondaryAddress: zod.string({ required_error: 'Address Line 2 is required' }),
  sponsorId: zod.string({ required_error: 'Sponsor Name is required' }),
  teamStrategy: zod.string({ required_error: 'Team Strategy is required' }),
  assetId: zod.string({ required_error: 'Coin ID is required' }),
  preferredContact: zod.string().optional().nullable(),
  preferredContactDetail: zod.string().optional().nullable(),
  syncWithSendy: zod.boolean().default(true),
  txcWallets: zod.array(
    zod.object({
      payoutId: zod.string({ required_error: 'Payout is required' }),
      address: zod.string({ required_error: 'Address is required' }),
      note: zod.string().optional().nullable(),
      percent: zod.number({ required_error: 'Percent is required' }),
    })
  ),
  otherWallets: zod.array(
    zod.object({
      payoutId: zod.string(),
      address: zod.string(),
      note: zod.string(),
      percent: zod.number().default(0),
    })
  ),
});
