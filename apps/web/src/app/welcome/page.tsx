import { SkyBackdrop } from '@medlearn/ui';
import type { Metadata } from 'next';

import { OnboardingView } from '@/features/onboarding/OnboardingView';

export const metadata: Metadata = { title: 'Set up your plan | MedLearn OS' };

export default function WelcomePage() {
  return (
    <>
      <SkyBackdrop />
      <OnboardingView />
    </>
  );
}
