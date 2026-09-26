'use client';

import { buttonClasses, Icon } from '@medlearn/ui';
import { ArrowRight } from '@medlearn/ui/icons';
import Link from 'next/link';

import { useProgress } from '@/features/progress/store';

/** New students start with the three setup questions; returning students go straight to Today. */
export function StartLink() {
  const { profile } = useProgress();
  return (
    <Link href={profile ? '/today' : '/welcome'} className={buttonClasses()}>
      {profile ? 'Open today’s plan' : 'Start in 3 steps'}
      <Icon icon={ArrowRight} />
    </Link>
  );
}
