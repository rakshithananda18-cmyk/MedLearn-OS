'use client';

import type { AccountStatus } from '@medlearn/schemas';
import { useCallback, useEffect, useState } from 'react';

export type AccountState =
  | { status: 'loading' }
  | { status: 'ready'; account: AccountStatus | null; signedIn: boolean; verified: boolean };

/** Who is signed in on this phone; `refresh` asks again after signing in or out. */
export function useAccount(): { state: AccountState; refresh: () => void } {
  const [state, setState] = useState<AccountState>({ status: 'loading' });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch('/api/account')
        .then(async (response): Promise<{ data: unknown; verified: boolean }> => {
          if (!response.ok) return { data: null, verified: false };
          const body = (await response.json()) as { data?: unknown };
          return { data: body.data, verified: true };
        })
        .catch(() => ({ data: null, verified: false })),
      // Loaded here rather than with the page, so the schema library is not in every download.
      import('@medlearn/schemas'),
    ]).then(([body, schemas]) => {
      if (cancelled) return;
      const result = schemas.AccountStatus.nullable().safeParse(body.data);
      const account = result.success ? result.data : null;
      setState({
        status: 'ready',
        account,
        signedIn: account !== null && !account.anonymous && account.email !== null,
        verified: body.verified && result.success,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const refresh = useCallback(() => setVersion((current) => current + 1), []);
  return { state, refresh };
}
