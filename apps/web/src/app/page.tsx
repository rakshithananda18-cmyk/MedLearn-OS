import { connection } from 'next/server';

import { getSubjectsRepository } from '@/server/db';

export default async function HomePage() {
  await connection();
  const subjects = await getSubjectsRepository().list();

  return (
    <main>
      <h1>MedLearn OS</h1>
      <p>Foundation build. Subjects loaded from the database:</p>
      <ul aria-label="Subjects">
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
    </main>
  );
}
