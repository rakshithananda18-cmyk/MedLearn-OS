-- Progress synced from the app, one row per learner. Students start with an anonymous account;
-- only students who confirmed they are 18 or older sync (the API enforces this; under-18
-- progress stays on the phone until a parent agrees).

create table public.learner_progress (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  progress jsonb not null check (pg_column_size(progress) <= 262144),
  updated_at timestamptz not null
);

comment on table public.learner_progress is 'Each learner''s study progress, as last saved by the app.';

alter table public.learner_progress enable row level security;

create policy "Learners read their own progress"
  on public.learner_progress
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy "Learners create their own progress"
  on public.learner_progress
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "Learners update their own progress"
  on public.learner_progress
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Content problems reported by students. Anyone may report; nobody but the service role (the
-- review team's tools) may read reports back.

create table public.content_reports (
  id bigint generated always as identity primary key,
  topic_slug text not null check (topic_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  content_version text not null check (content_version ~ '^\d+\.\d+\.\d+$'),
  kind text not null check (kind in ('factual-error', 'unclear', 'typo', 'visual', 'other')),
  note text check (char_length(note) <= 1000),
  reporter_id uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.content_reports is 'Issues students report on a topic version; read by reviewers only.';

create index content_reports_topic_idx on public.content_reports (topic_slug, created_at desc);

alter table public.content_reports enable row level security;

create policy "Anyone can report a content issue"
  on public.content_reports
  for insert
  to anon, authenticated
  with check (reporter_id is null or reporter_id = (select auth.uid()));
