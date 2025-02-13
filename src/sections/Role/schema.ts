import { z as zod } from 'zod';

import { RoleEnum } from 'src/__generated__/graphql';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  name: zod.string({ required_error: 'Name is required' }),
  description: zod.string({ required_error: 'Description is required' }),
  sale: zod.enum([RoleEnum.Editor, RoleEnum.Owner, RoleEnum.Viewer, RoleEnum.None]),
  proof: zod.enum([RoleEnum.Editor, RoleEnum.Owner, RoleEnum.Viewer, RoleEnum.None]),
  member: zod.enum([RoleEnum.Editor, RoleEnum.Owner, RoleEnum.Viewer, RoleEnum.None]),
  balance: zod.enum([RoleEnum.Editor, RoleEnum.Owner, RoleEnum.Viewer, RoleEnum.None]),
  additions: zod.enum([RoleEnum.Editor, RoleEnum.Owner, RoleEnum.Viewer, RoleEnum.None]),
  commission: zod.enum([RoleEnum.Editor, RoleEnum.Owner, RoleEnum.Viewer, RoleEnum.None]),
});
