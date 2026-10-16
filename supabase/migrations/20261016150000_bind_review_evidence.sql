-- An old approval without a digest remains in history, but cannot approve changed content.
alter table public.topic_reviews
  add column content_digest text check (content_digest ~ '^[a-f0-9]{64}$');

comment on column public.topic_reviews.content_digest is
  'SHA-256 of the topic, book evidence and referenced visual assets. Null legacy reviews need rechecking.';

-- Defaults are caller-overridable. Stamp all new review audit values from the signed session,
-- even when a reviewer writes directly through PostgREST instead of the app route.
create function public.stamp_topic_review()
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
  new.created_at := clock_timestamp();
  return new;
end;
$$;

revoke all on function public.stamp_topic_review() from public, anon, authenticated;
create trigger stamp_topic_review
  before insert on public.topic_reviews
  for each row execute function public.stamp_topic_review();

drop function public.topic_review_status();
create function public.topic_review_status()
returns table (
  topic_slug text, content_version text, content_digest text, decision text, decided_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select distinct on (r.topic_slug)
    r.topic_slug, r.content_version, r.content_digest, r.decision, r.created_at
  from public.topic_reviews r
  -- Identity order is append order, even if a pre-migration row supplied a future timestamp.
  order by r.topic_slug, r.id desc;
$$;

comment on function public.topic_review_status is
  'Latest topic decision and immutable content evidence; reviewer identity and notes stay private.';
revoke all on function public.topic_review_status from public;
grant execute on function public.topic_review_status to anon, authenticated;
