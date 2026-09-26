import { SkyBackdrop } from '@medlearn/ui';
import type { Metadata } from 'next';

import { FacilitatorView } from '@/features/facilitator/FacilitatorView';

export const metadata: Metadata = {
  title: 'Facilitator setup | MedLearn OS',
  robots: { index: false, follow: false },
};

export default function FacilitatorPage() {
  return (
    <>
      <SkyBackdrop />
      <FacilitatorView />
    </>
  );
}
