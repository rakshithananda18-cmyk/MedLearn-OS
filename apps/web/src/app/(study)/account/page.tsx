import type { Metadata } from 'next';
import { connection } from 'next/server';

import { AccountView } from '@/features/account/AccountView';
import { Screen } from '@/features/shell/Screen';
import { getAccessList } from '@/server/access';

export const metadata: Metadata = { title: 'Account | MedLearn OS' };

export default async function AccountPage() {
  // Read at request time, so changing the access list needs no rebuild.
  await connection();
  return (
    <Screen>
      <AccountView inviteOnly={getAccessList() !== null} />
    </Screen>
  );
}
