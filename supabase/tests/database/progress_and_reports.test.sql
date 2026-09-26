begin;
create extension if not exists pgtap with schema extensions;

select plan(11);

-- Two learners, named once (psql variables; pg_prove runs this file through psql).
\set learner_a '00000000-0000-0000-0000-00000000000a'
\set learner_b '00000000-0000-0000-0000-00000000000b'
insert into auth.users (id) values (:'learner_a'), (:'learner_b');

select is(
  (select relrowsecurity from pg_class where oid = 'public.learner_progress'::regclass),
  true,
  'row-level security is enabled on learner_progress'
);
select is(
  (select relrowsecurity from pg_class where oid = 'public.content_reports'::regclass),
  true,
  'row-level security is enabled on content_reports'
);

-- Learner A saves progress.
set local role authenticated;
select set_config('request.jwt.claims', json_build_object('sub', :'learner_a', 'role', 'authenticated')::text, true);

select lives_ok(
  $$ insert into public.learner_progress (progress, updated_at) values ('{"completedLessons":[]}', now()) $$,
  'a learner can save their own progress'
);
select throws_ok(
  $$ insert into public.learner_progress (user_id, progress, updated_at)
     values ('00000000-0000-0000-0000-00000000000b', '{}', now()) $$,
  '42501',
  null,
  'a learner cannot save progress for someone else'
);
select results_eq(
  'select count(*)::int from public.learner_progress',
  array[1],
  'a learner sees their own progress'
);

-- Learner B cannot see or change it.
select set_config('request.jwt.claims', json_build_object('sub', :'learner_b', 'role', 'authenticated')::text, true);

select is_empty(
  'select user_id from public.learner_progress',
  'another learner cannot read it'
);
select is_empty(
  $$ update public.learner_progress set progress = '{}' returning user_id $$,
  'another learner cannot change it'
);

-- Anonymous visitors can report issues but never read reports or progress.
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select lives_ok(
  $$ insert into public.content_reports (topic_slug, content_version, kind, note)
     values ('brachial-plexus', '0.1.0', 'unclear', 'Step 3 is hard to follow') $$,
  'anyone can report an issue'
);
select is_empty('select id from public.content_reports', 'reports are not readable by students');
select throws_ok(
  $$ insert into public.content_reports (topic_slug, content_version, kind)
     values ('brachial-plexus', '0.1.0', 'rant') $$,
  '23514',
  null,
  'report kinds are limited to the known list'
);
select is_empty(
  'select user_id from public.learner_progress',
  'anonymous visitors cannot read progress'
);

select * from finish();
rollback;
