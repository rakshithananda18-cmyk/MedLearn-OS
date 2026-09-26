import { randomUUID } from 'node:crypto';

import type { Subject } from '@medlearn/schemas';

export function makeSubject(overrides: Partial<Subject> = {}): Subject {
  return { id: randomUUID(), slug: 'anatomy', name: 'Anatomy', sortOrder: 1, ...overrides };
}
