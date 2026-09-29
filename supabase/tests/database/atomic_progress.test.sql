begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

\set function_signature_sql '''public.save_learner_progress(uuid,jsonb,timestamptz,timestamptz,boolean)'''
\set execute_privilege_sql '''EXECUTE'''
\set learner_a_sql '''00000000-0000-0000-0000-00000000001a'''
\set learner_b_sql '''00000000-0000-0000-0000-00000000001b'''
\set empty_progress_sql '''{}'''
\set other_progress_sql '''{"completedLessons":["other"]}'''
\set brachial_progress_sql '''{"completedLessons":["brachial-plexus"]}'''
\set initial_version_sql '''2026-09-28 09:00:00Z'''
\set current_version_sql '''2026-09-28 10:00:00Z'''
\set next_version_sql '''2026-09-28 11:00:00Z'''
\set denied_insert_statement_sql '''select public.save_learner_progress(%L, %L, %L, null, true)'''

select has_function('public', 'save_learner_progress',
  array['uuid', 'jsonb', 'timestamp with time zone', 'timestamp with time zone', 'boolean'],
  'the atomic progress save function exists');
select is((select prosecdef from pg_proc where oid =
  :function_signature_sql::regprocedure),
  false, 'progress writes run with the caller permissions');
select ok(not has_function_privilege('anon',
  :function_signature_sql, :execute_privilege_sql),
  'anonymous visitors cannot call the save function');
select ok(has_function_privilege('authenticated',
  :function_signature_sql, :execute_privilege_sql),
  'signed-in learners can call the save function');

insert into auth.users (id) values (:learner_a_sql), (:learner_b_sql);
set local role authenticated;
select set_config('request.jwt.claims', json_build_object('sub', :learner_a_sql, 'role', 'authenticated')::text, true);

select is(public.save_learner_progress(:learner_a_sql, '{"completedLessons":[]}',
  :initial_version_sql, null, true), true, 'an absent version can create a row');
select is(public.save_learner_progress(:learner_a_sql, :other_progress_sql,
  :current_version_sql, null, true), false, 'an absent version cannot replace a saved row');
select is(public.save_learner_progress(:learner_a_sql, :brachial_progress_sql,
  :current_version_sql, :initial_version_sql, true), true, 'the loaded version can be updated');
select is(public.save_learner_progress(:learner_a_sql, :other_progress_sql,
  :next_version_sql, :initial_version_sql, true), false, 'a stale base cannot overwrite a newer row');
select is(public.save_learner_progress(:learner_a_sql, :other_progress_sql,
  :current_version_sql), false, 'legacy clients cannot replace a different same-version payload');
select is(public.save_learner_progress(:learner_a_sql, :brachial_progress_sql,
  :current_version_sql), true, 'an identical legacy retry succeeds');
select is((select progress->'completedLessons' from public.learner_progress),
  '["brachial-plexus"]'::jsonb, 'rejected writes leave the saved work intact');

select set_config('request.jwt.claims', json_build_object('sub', :learner_b_sql, 'role', 'authenticated')::text, true);
select is(public.save_learner_progress(:learner_a_sql, :empty_progress_sql,
  :next_version_sql, :current_version_sql, true), false, 'a learner cannot update another learner through the function');
select throws_ok(format(:denied_insert_statement_sql, :learner_a_sql, :empty_progress_sql, :next_version_sql),
  '42501', null, 'cross-learner inserts still fail RLS');

set local role anon;
select throws_ok(format(:denied_insert_statement_sql, :learner_a_sql, :empty_progress_sql, :next_version_sql),
  '42501', null, 'visitors cannot execute progress saves');
select * from finish();
rollback;
