import { afterEach, describe, expect, it, vi } from 'vitest';

const list = vi.hoisted(() => vi.fn());

vi.mock('@medlearn/db', () => ({
  createDbClient: () => ({}),
  createSubjectsRepository: () => ({ list }),
}));
vi.mock('./env', () => ({
  getDbConfig: () => ({ url: 'http://localhost:54321', key: 'test' }),
  getLogLevel: () => 'silent',
}));

const { listSubjects } = await import('./db');

afterEach(() => list.mockReset());

describe('listSubjects', () => {
  it('lists the subjects from the database', async () => {
    list.mockResolvedValue([{ id: '1', slug: 'anatomy', name: 'Anatomy', sortOrder: 1 }]);
    await expect(listSubjects()).resolves.toEqual([
      { id: '1', slug: 'anatomy', name: 'Anatomy', sortOrder: 1 },
    ]);
  });

  it('still lists the first-year subjects when the database cannot be reached', async () => {
    list.mockRejectedValue(new Error('connect ECONNREFUSED 127.0.0.1:54321'));
    await expect(listSubjects()).resolves.toEqual([
      { slug: 'anatomy', name: 'Anatomy' },
      { slug: 'physiology', name: 'Physiology' },
      { slug: 'biochemistry', name: 'Biochemistry' },
    ]);
  });
});
