begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

select has_function('public', 'save_learner_progress',
  array['uuid', 'jsonb', 'timestamp with time zone', 'timestamp with time zone', 'boolean'],
  'the atomic progress save function exists');
select is((select prosecdef from pg_proc where oid =
  'public.save_learner_progress(uuid,jsonb,timestamptz,timestamptz,boolean)'::regprocedure),
  false, 'progress writes run with the caller permissions');
select ok(not has_function_privilege('anon',
  'public.save_learner_progress(uuid,jsonb,timestamptz,timestamptz,boolean)', 'EXECUTE'),
  'anonymous visitors cannot call the save function');
select ok(has_function_privilege('authenticated',
  'public.save_learner_progress(uuid,jsonb,timestamptz,timestamptz,boolean)', 'EXECUTE'),
  'signed-in learners can call the save function');

\set learner_a '00000000-0000-0000-0000-00000000001a'
\set learner_b '00000000-0000-0000-0000-00000000001b'
insert into auth.users (id) values (:'learner_a'), (:'learner_b');
set local role authenticated;
select set_config('request.jwt.claims', json_build_object('sub', :'learner_a', 'role', 'authenticated')::text, true);

select is(public.save_learner_progress(:'learner_a', '{"completedLessons":[]}',
  '2026-09-28 09:00:00Z', null, true), true, 'an absent version can create a row');
select is(public.save_learner_progress(:'learner_a', '{"completedLessons":["other"]}',
  '2026-09-28 10:00:00Z', null, true), false, 'an absent version cannot replace a saved row');
select is(public.save_learner_progress(:'learner_a', '{"completedLessons":["brachial-plexus"]}',
  '2026-09-28 10:00:00Z', '2026-09-28 09:00:00Z', true), true, 'the loaded version can be updated');
select is(public.save_learner_progress(:'learner_a', '{"completedLessons":["other"]}',
  '2026-09-28 11:00:00Z', '2026-09-28 09:00:00Z', true), false, 'a stale base cannot overwrite a newer row');
select is(public.save_learner_progress(:'learner_a', '{"completedLessons":["other"]}',
  '2026-09-28 10:00:00Z'), false, 'legacy clients cannot replace a different same-version payload');
select is(public.save_learner_progress(:'learner_a', '{"completedLessons":["brachial-plexus"]}',
  '2026-09-28 10:00:00Z'), true, 'an identical legacy retry succeeds');
select is((select progress->'completedLessons' from public.learner_progress),
  '["brachial-plexus"]'::jsonb, 'rejected writes leave the saved work intact');

select set_config('request.jwt.claims', json_build_object('sub', :'learner_b', 'role', 'authenticated')::text, true);
select is(public.save_learner_progress(:'learner_a', '{}',
  '2026-09-28 11:00:00Z', '2026-09-28 10:00:00Z', true), false, 'a learner cannot update another learner through the function');
select throws_ok($$ select public.save_learner_progress('00000000-0000-0000-0000-00000000001a', '{}',
  '2026-09-28 11:00:00Z', null, true) $$, '42501', null, 'cross-learner inserts still fail RLS');

set local role anon;
select throws_ok($$ select public.save_learner_progress('00000000-0000-0000-0000-00000000001a', '{}',
  '2026-09-28 11:00:00Z', null, true) $$, '42501', null, 'visitors cannot execute progress saves');
select * from finish();
rollback;
