import { z as zod } from 'zod';

export type SchemaType = zod.infer<typeof Schema>;

export const Schema = zod.object({
  note: zod.string().min(1, 'Note is required'),
  // memberIds: zod.array(zod.string().min(1, 'Member is required')).optional().nullable(),
});
