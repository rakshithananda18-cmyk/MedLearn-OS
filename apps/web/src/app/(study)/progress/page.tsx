import { redirect } from 'next/navigation';

/** Progress lives in the library now; old links and bookmarks land on its Progress view. */
export default function ProgressPage() {
  redirect('/subjects?view=progress');
}
