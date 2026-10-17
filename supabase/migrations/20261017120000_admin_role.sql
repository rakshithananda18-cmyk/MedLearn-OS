-- Admins run the review team from the app: who may review and what qualifies them, with every
-- change kept. Who is an admin stays in SQL, so no admin can lock the others out from the app.

create table public.app_admins (
  email text primary key check (email = lower(email) and email like '%_@_%'),
  added_at timestamptz not null default now()
);

comment on table public.app_admins is
  'Emails allowed to manage the review team. Add one with: insert into public.app_admins (email) values (''name@example.com'');';

alter table public.app_admins enable row level security;
-- No policies: the API cannot read or change the list; is_admin() reads it as its owner.

-- Whether the signed-in person is an admin. Anonymous sessions never are.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
    and exists (
      select 1 from public.app_admins a
      where a.email = lower(coalesce((select auth.jwt()) ->> 'email', ''))
    );
$$;

comment on function public.is_admin is 'True when the signed-in, non-anonymous user is an admin.';

revoke all on function public.is_admin from public, anon;
grant execute on function public.is_admin to authenticated;

-- A reviewer's qualification (degree, year, department) and who added them.
alter table public.content_reviewers
  add column qualification text not null default ''
    check (char_length(qualification) <= 200),
  add column added_by text;

comment on column public.content_reviewers.qualification is
  'What qualifies this reviewer to check content, e.g. MD Anatomy, faculty.';

-- Admins see and manage the team; everyone else still cannot read it.
create policy "Admins read reviewers"
  on public.content_reviewers for select to authenticated
  using ((select public.is_admin()));

create policy "Admins add reviewers"
  on public.content_reviewers for insert to authenticated
  with check ((select public.is_admin()));

create policy "Admins change reviewers"
  on public.content_reviewers for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins remove reviewers"
  on public.content_reviewers for delete to authenticated
  using ((select public.is_admin()));

revoke all on table public.content_reviewers from anon;
-- Only the qualification is edited in place; an email is removed and added again.
revoke update on table public.content_reviewers from authenticated;
grant select, insert, delete on table public.content_reviewers to authenticated;
grant update (qualification) on table public.content_reviewers to authenticated;

-- Who added a reviewer and when are stamped from the session, whatever the insert supplies.
create function public.stamp_reviewer()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.email := lower(new.email);
  new.added_by := coalesce(lower((select auth.jwt()) ->> 'email'), 'database');
  new.added_at := now();
  return new;
end;
$$;

create trigger stamp_reviewer
  before insert on public.content_reviewers
  for each row execute function public.stamp_reviewer();

-- Every change to the team, kept: what happened, to whom, by whom and when.
create table public.role_changes (
  id bigint generated always as identity primary key,
  role text not null check (role in ('reviewer')),
  email text not null,
  action text not null check (action in ('added', 'updated', 'removed')),
  qualification text,
  changed_by text not null,
  changed_at timestamptz not null default now()
);

comment on table public.role_changes is 'Append-only log of changes to the review team.';

alter table public.role_changes enable row level security;

create policy "Admins read role changes"
  on public.role_changes for select to authenticated
  using ((select public.is_admin()));
-- No write policies: only the trigger below writes, as its owner.
revoke all on table public.role_changes from anon;
revoke insert, update, delete on table public.role_changes from authenticated;

create function public.log_reviewer_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor text := coalesce(lower((select auth.jwt()) ->> 'email'), 'database');
begin
  if tg_op = 'DELETE' then
    insert into public.role_changes (role, email, action, qualification, changed_by)
    values ('reviewer', old.email, 'removed', old.qualification, actor);
    return old;
  end if;
  insert into public.role_changes (role, email, action, qualification, changed_by)
  values (
    'reviewer',
    new.email,
    case when tg_op = 'INSERT' then 'added' else 'updated' end,
    new.qualification,
    actor
  );
  return new;
end;
$$;

revoke all on function public.log_reviewer_change() from public, anon, authenticated;

create trigger log_reviewer_change
  after insert or update or delete on public.content_reviewers
  for each row execute function public.log_reviewer_change();

-- A review keeps the qualification its reviewer had when deciding, for the record.
alter table public.topic_reviews add column reviewer_qualification text;

-- The signed-in reviewer's own qualification (reviewers cannot read the team list).
create function public.my_reviewer_qualification()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select r.qualification from public.content_reviewers r
  where r.email = lower(coalesce((select auth.jwt()) ->> 'email', ''));
$$;

revoke all on function public.my_reviewer_qualification from public, anon;
grant execute on function public.my_reviewer_qualification to authenticated;

create or replace function public.stamp_topic_review()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if not public.is_reviewer() or auth.uid() is null then
    raise exception 'Only reviewers can review' using errcode = '42501';
  end if;
  if new.content_digest is null then
    raise exception 'A content digest is required for a new review' using errcode = '23514';
  end if;
  new.reviewer_id := auth.uid();
  new.reviewer_email := lower(auth.jwt() ->> 'email');
  new.reviewer_qualification := nullif(public.my_reviewer_qualification(), '');
  new.created_at := clock_timestamp();
  return new;
end;
$$;
