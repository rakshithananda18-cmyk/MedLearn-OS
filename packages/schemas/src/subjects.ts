import { z } from 'zod';

export const Subject = z.object({
  id: z.uuid(),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: z.string().min(1).max(80),
  sortOrder: z.number().int(),
});
export type Subject = z.infer<typeof Subject>;
