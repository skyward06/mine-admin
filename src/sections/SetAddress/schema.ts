import { z as zod } from 'zod';

import { PaymentChain } from 'src/__generated__/graphql';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  address: zod.string().min(1, 'Address is required'),
  chain: zod.enum([
    PaymentChain.Bnb,
    PaymentChain.Eth,
    PaymentChain.Txc,
    PaymentChain.Base,
    PaymentChain.Polygon,
  ]),
});
