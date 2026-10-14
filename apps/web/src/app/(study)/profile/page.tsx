import type { Metadata } from 'next';

import { BOOKS } from '@/content/books';
import { PLANNABLE_TOPICS } from '@/content/topics';
import { ProfileView } from '@/features/profile/ProfileView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Profile | MedLearn OS' };

export default function ProfilePage() {
  return (
    <Screen width="wide">
      <ProfileView
        topics={PLANNABLE_TOPICS}
        books={Object.fromEntries(BOOKS.map((book) => [book.id, book.shortTitle]))}
      />
    </Screen>
  );
}
