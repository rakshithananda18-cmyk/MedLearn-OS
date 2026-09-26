'use client';

import type { AccountStatus } from '@medlearn/schemas';
import { useCallback, useEffect, useState } from 'react';

export type AccountState =
  { status: 'loading' } | { status: 'ready'; account: AccountStatus | null; signedIn: boolean };

/** Who is signed in on this phone; `refresh` asks again after signing in or out. */
export function useAccount(): { state: AccountState; refresh: () => void } {
  const [state, setState] = useState<AccountState>({ status: 'loading' });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch('/api/account')
        .then(async (response): Promise<{ data: unknown }> =>
          response.ok ? response.json() : { data: null },
        )
        .catch(() => ({ data: null })),
      // Loaded here rather than with the page, so the schema library is not in every download.
      import('@medlearn/schemas'),
    ]).then(([body, schemas]) => {
      if (cancelled) return;
      const account = schemas.AccountStatus.nullable().catch(null).parse(body.data);
      setState({
        status: 'ready',
        account,
        signedIn: account !== null && !account.anonymous && account.email !== null,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const refresh = useCallback(() => setVersion((current) => current + 1), []);
  return { state, refresh };
}
