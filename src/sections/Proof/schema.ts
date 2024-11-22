import { z as zod } from 'zod';

import { ProofType } from 'src/__generated__/graphql';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  amount: zod.number({ required_error: 'amount is required' }).default(0),
  refId: zod.string({ required_error: 'Reference ID is required' }),
  note: zod.string().optional().nullable(),
  type: zod.enum([
    ProofType.Mine,
    ProofType.Sale,
    ProofType.Prepay,
    ProofType.Profit,
    ProofType.Salary,
    ProofType.Overhead,
    ProofType.Promotion,
    ProofType.Commission,
    ProofType.Infrastructure,
  ]),
  reflinks: zod
    .array(
      zod.object({
        linkType: zod.string(),
        link: zod.string(),
      })
    )
    .optional()
    .nullable(),
});
