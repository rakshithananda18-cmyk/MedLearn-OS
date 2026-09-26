'use client';

import { AccountStatus } from '@medlearn/schemas';
import { useCallback, useEffect, useState } from 'react';

export type AccountState =
  { status: 'loading' } | { status: 'ready'; account: AccountStatus | null; signedIn: boolean };

const Body = AccountStatus.nullable().catch(null);

/** Who is signed in on this phone; `refresh` asks again after signing in or out. */
export function useAccount(): { state: AccountState; refresh: () => void } {
  const [state, setState] = useState<AccountState>({ status: 'loading' });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/account')
      .then((response) => (response.ok ? response.json() : { data: null }))
      .catch(() => ({ data: null }))
      .then((body: { data: unknown }) => {
        if (cancelled) return;
        const account = Body.parse(body.data);
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
