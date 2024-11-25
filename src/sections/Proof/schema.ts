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
    ProofType.Developersweb,
    ProofType.Developersapps,
    ProofType.Infrastructure,
    ProofType.Mineelectricity,
    ProofType.Minemaintainance,
    ProofType.Minenewequipment,
    ProofType.Developersprotocol,
    ProofType.Administrationsalary,
    ProofType.Marketingtxcpromotion,
    ProofType.Developersintegrations,
    ProofType.Minefacilityrentmortage,
    ProofType.Marketingminetxcpromotion,
  ]),
  mineLocation: zod.string().optional().nullable(),
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
