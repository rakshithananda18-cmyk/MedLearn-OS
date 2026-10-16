begin;
create extension if not exists pgtap with schema extensions;
select plan(9);

\set reviewer '00000000-0000-0000-0000-0000000000d1'
\set other '00000000-0000-0000-0000-0000000000d2'
insert into auth.users (id, email) values
  (:'reviewer', 'integrity.reviewer@example.com'),
  (:'other', 'other.person@example.com');
insert into public.content_reviewers (email) values ('integrity.reviewer@example.com');

-- A genuine pre-migration record stays unbound; there is no automatic approval upgrade.
alter table public.topic_reviews disable trigger stamp_topic_review;
insert into public.topic_reviews (topic_slug, content_version, decision, pages_checked,
  facts_checked, questions_checked, visuals_checked, reviewer_email, created_at)
values ('legacy-topic', '0.1.0', 'approved', true, true, true, true, 'legacy@example.com', '2099-01-01');
alter table public.topic_reviews enable trigger stamp_topic_review;
select is((select content_digest from public.topic_review_status() where topic_slug = 'legacy-topic'),
  null::text, 'legacy decisions retain no digest and therefore need a new review');

set local role authenticated;
select set_config('request.jwt.claims', json_build_object(
  'sub', :'reviewer', 'role', 'authenticated', 'email', 'integrity.reviewer@example.com')::text, true);

select lives_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, content_digest, decision,
     pages_checked, facts_checked, questions_checked, visuals_checked, reviewer_id,
     reviewer_email, created_at)
     values ('integrity-topic', '0.1.0', repeat('a',64), 'approved', true, true, true, true,
       '00000000-0000-0000-0000-0000000000d2', 'forged@example.com', '2099-01-01') $$,
  'a direct insert succeeds with audit fields enforced by the server');
select is((select reviewer_id from public.topic_reviews where topic_slug = 'integrity-topic'),
  :'reviewer'::uuid, 'reviewer id comes from the authenticated session');
select is((select reviewer_email from public.topic_reviews where topic_slug = 'integrity-topic'),
  'integrity.reviewer@example.com', 'reviewer email cannot be forged');
select ok((select abs(extract(epoch from (created_at - clock_timestamp()))) < 5
  from public.topic_reviews where topic_slug = 'integrity-topic'), 'review time is stamped by the database');
select throws_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, decision, note)
     values ('missing-digest', '0.1.0', 'changes-requested', 'check the diagram') $$,
  '23514', null, 'new decisions require content evidence');
select throws_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, content_digest, decision, note)
     values ('invalid-digest', '0.1.0', 'not-a-sha256', 'changes-requested', 'check the diagram') $$,
  '23514', null, 'invalid content digests are rejected');
select lives_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, content_digest, decision, note)
     values ('legacy-topic', '0.1.0', repeat('b',64), 'changes-requested', 'Check the old evidence') $$,
  'a new decision supersedes a historical row with a forged future date');
select is((select content_digest from public.topic_review_status() where topic_slug = 'legacy-topic'),
  repeat('b',64), 'append order determines the latest outcome instead of caller-supplied legacy time');

select * from finish();
rollback;
