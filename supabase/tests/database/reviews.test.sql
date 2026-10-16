begin;
create extension if not exists pgtap with schema extensions;

select plan(17);

\set reviewer '00000000-0000-0000-0000-0000000000c1'
\set student '00000000-0000-0000-0000-0000000000c2'
insert into auth.users (id, email) values
  (:'reviewer', 'reviewer.test@example.com'),
  (:'student', 'student.test@example.com');
insert into public.content_reviewers (email) values ('reviewer.test@example.com');
insert into public.content_reports (topic_slug, content_version, kind, note)
  values ('brachial-plexus', '0.1.0', 'typo', 'Spelling in step 2');

select is(
  (select relrowsecurity from pg_class where oid = 'public.topic_reviews'::regclass),
  true,
  'row-level security is enabled on topic_reviews'
);
select is(
  (select relrowsecurity from pg_class where oid = 'public.content_reviewers'::regclass),
  true,
  'row-level security is enabled on content_reviewers'
);

-- A student: no reviewing, no reading reviews or reports, but the public outcome is open.
set local role authenticated;
select set_config('request.jwt.claims', json_build_object(
  'sub', :'student', 'role', 'authenticated', 'email', 'student.test@example.com')::text, true);

select is(public.is_reviewer(), false, 'a student is not a reviewer');
select throws_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, decision, pages_checked,
       facts_checked, questions_checked, visuals_checked)
     values ('brachial-plexus', '0.1.0', 'approved', true, true, true, true) $$,
  '42501',
  null,
  'a student cannot approve a topic'
);
select is_empty('select id from public.content_reports', 'a student cannot read reports');
select is_empty('select email from public.content_reviewers', 'nobody reads the reviewer list');

-- A reviewer.
select set_config('request.jwt.claims', json_build_object(
  'sub', :'reviewer', 'role', 'authenticated', 'email', 'reviewer.test@example.com')::text, true);

select is(public.is_reviewer(), true, 'a listed email is a reviewer');
select throws_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, decision, pages_checked)
     values ('brachial-plexus', '0.1.0', 'approved', true) $$,
  '23514',
  null,
  'approval needs every check'
);
select throws_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, decision)
     values ('brachial-plexus', '0.1.0', 'changes-requested') $$,
  '23514',
  null,
  'asking for changes needs a note'
);
select lives_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, decision, note)
     values ('brachial-plexus', '0.1.0', 'changes-requested', 'C8 is missing from step 2') $$,
  'a reviewer can ask for changes'
);
select lives_ok(
  $$ insert into public.topic_reviews (topic_slug, content_version, decision, pages_checked,
       facts_checked, questions_checked, visuals_checked)
     values ('brachial-plexus', '0.1.0', 'approved', true, true, true, true) $$,
  'a reviewer can approve with every check done'
);
select results_eq(
  $$ select reviewer_email from public.topic_reviews order by id desc limit 1 $$,
  array['reviewer.test@example.com'],
  'the review records who made it'
);
select results_eq(
  $$ insert into public.topic_reviews (topic_slug, content_version, decision, note,
       reviewer_email, created_at)
     values ('axilla', '0.1.0', 'changes-requested', 'Check the apex',
       'someone.else@example.com', '2030-01-01')
     returning reviewer_email || ' ' || (created_at < now() + interval '1 minute')::text $$,
  array['reviewer.test@example.com true'],
  'the database stamps who reviewed and when, whatever the insert says'
);
select lives_ok(
  $$ update public.content_reports set resolved_at = now(), resolved_by = auth.uid() $$,
  'a reviewer can mark a report resolved'
);
select throws_ok(
  $$ update public.content_reports set note = 'changed' $$,
  '42501',
  null,
  'a reviewer cannot rewrite what a student reported'
);

-- Anyone, even without a session, sees the latest outcome and nothing else.
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select results_eq(
  $$ select decision from public.topic_review_status() where topic_slug = 'brachial-plexus' $$,
  array['approved'],
  'everyone sees the latest decision'
);
select throws_ok(
  'select public.is_reviewer()',
  '42501',
  null,
  'visitors cannot ask who reviews'
);

select * from finish();
rollback;
