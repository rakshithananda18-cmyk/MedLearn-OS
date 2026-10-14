import { redirect } from 'next/navigation';

/** Progress lives on the library's list now; old links and bookmarks land there. */
export default function ProgressPage() {
  redirect('/subjects');
}
