-- Medical review of topics: who may review, what each review decided, and the outcome every
-- student sees (so a topic shows as checked the moment it is approved, without a new release).

-- The review team, by email. Managed in the database (SQL editor or Studio); never through the API.
create table public.content_reviewers (
  email text primary key check (email = lower(email) and email like '%_@_%'),
  added_at timestamptz not null default now()
);

comment on table public.content_reviewers is
  'Emails allowed to review topics. Add one with: insert into public.content_reviewers (email) values (''name@example.com'');';

alter table public.content_reviewers enable row level security;
-- No policies: the API cannot read or change the list; is_reviewer() reads it as its owner.

-- Whether the signed-in person is on the review team. Anonymous sessions never are.
create function public.is_reviewer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
    and exists (
      select 1 from public.content_reviewers r
      where r.email = lower(coalesce((select auth.jwt()) ->> 'email', ''))
    );
$$;

comment on function public.is_reviewer is 'True when the signed-in, non-anonymous user is a content reviewer.';

revoke all on function public.is_reviewer from public, anon;
grant execute on function public.is_reviewer to authenticated;

-- Every review, kept as history: a topic version is approved only with all four checks done.
create table public.topic_reviews (
  id bigint generated always as identity primary key,
  topic_slug text not null check (topic_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  content_version text not null check (content_version ~ '^\d+\.\d+\.\d+$'),
  decision text not null check (decision in ('approved', 'changes-requested')),
  pages_checked boolean not null default false,
  facts_checked boolean not null default false,
  questions_checked boolean not null default false,
  visuals_checked boolean not null default false,
  note text check (char_length(note) <= 2000),
  reviewer_id uuid default auth.uid() references auth.users (id) on delete set null,
  reviewer_email text not null default lower(coalesce(auth.jwt() ->> 'email', '')),
  created_at timestamptz not null default now(),
  constraint approval_needs_every_check check (
    decision <> 'approved'
    or (pages_checked and facts_checked and questions_checked and visuals_checked)
  ),
  constraint changes_need_a_note check (
    decision <> 'changes-requested' or char_length(coalesce(note, '')) > 0
  )
);

comment on table public.topic_reviews is 'Reviews of topic versions by the review team; append-only history.';

create index topic_reviews_topic_idx on public.topic_reviews (topic_slug, created_at desc);

alter table public.topic_reviews enable row level security;

create policy "Reviewers read reviews"
  on public.topic_reviews
  for select
  to authenticated
  using ((select public.is_reviewer()));

create policy "Reviewers add their own reviews"
  on public.topic_reviews
  for insert
  to authenticated
  with check ((select public.is_reviewer()) and reviewer_id = (select auth.uid()));

-- What every student may know: each topic's latest decision and the version it was about,
-- without who reviewed it or what they wrote.
create function public.topic_review_status()
returns table (topic_slug text, content_version text, decision text, decided_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select distinct on (r.topic_slug) r.topic_slug, r.content_version, r.decision, r.created_at
  from public.topic_reviews r
  order by r.topic_slug, r.created_at desc, r.id desc;
$$;

comment on function public.topic_review_status is
  'Latest review decision per topic, readable by everyone; reviewer names and notes stay private.';

revoke all on function public.topic_review_status from public;
grant execute on function public.topic_review_status to anon, authenticated;

-- Reviewers triage what students report: they read reports and mark them resolved, nothing more.
alter table public.content_reports
  add column resolved_at timestamptz,
  add column resolved_by uuid references auth.users (id) on delete set null;

create policy "Reviewers read reports"
  on public.content_reports
  for select
  to authenticated
  using ((select public.is_reviewer()));

create policy "Reviewers resolve reports"
  on public.content_reports
  for update
  to authenticated
  using ((select public.is_reviewer()))
  with check ((select public.is_reviewer()));

revoke update on table public.content_reports from anon, authenticated;
grant update (resolved_at, resolved_by) on table public.content_reports to authenticated;
