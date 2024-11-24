import { z as zod } from 'zod';

import { ProofType } from 'src/__generated__/graphql';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  amount: zod.number({ required_error: 'amount is required' }).default(0),
  refId: zod.string({ required_error: 'Reference ID is required' }),
  note: zod.string().optional().nullable(),
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  type: zod.enum([
    ProofType.Sale,
    ProofType.Prepay,
    ProofType.Profit,
    ProofType.Overhead,
    ProofType.Promotion,
    ProofType.Commission,
    ProofType.Infrastructure,
    ProofType.Administrationsalary,
    ProofType.Marketingminetxcpromotion,
    ProofType.Marketingtxcpromotion,
    ProofType.Mineelectricity,
    ProofType.Minefacilityrentmortage,
    ProofType.Minemaintainance,
    ProofType.Minenewequipment,
    ProofType.Developersapps,
    ProofType.Developersintegrations,
    ProofType.Developersprotocol,
    ProofType.Developersweb,
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
