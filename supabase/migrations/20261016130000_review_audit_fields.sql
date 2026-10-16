-- Who reviewed and when are stamped by the database, whatever an insert supplies, so a reviewer
-- writing straight to the API cannot record a review under another email or another time.
create function public.stamp_topic_review()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.reviewer_id := (select auth.uid());
  new.reviewer_email := lower(coalesce((select auth.jwt()) ->> 'email', ''));
  new.created_at := now();
  return new;
end;
$$;

comment on function public.stamp_topic_review is 'Sets a review''s reviewer and time from the session.';

create trigger stamp_topic_review
  before insert on public.topic_reviews
  for each row execute function public.stamp_topic_review();
