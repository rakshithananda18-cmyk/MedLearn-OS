import type { Metadata } from 'next';

import { AccountView } from '@/features/account/AccountView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Account | MedLearn OS' };

export default function AccountPage() {
  return (
    <Screen>
      <AccountView />
    </Screen>
  );
}
