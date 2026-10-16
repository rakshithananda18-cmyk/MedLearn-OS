begin;
create extension if not exists pgtap with schema extensions;
select plan(15);

insert into auth.users (id) values ('00000000-0000-0000-0000-000000000031'), ('00000000-0000-0000-0000-000000000032');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000031","role":"authenticated"}', true);

select is(public.save_learner_progress('00000000-0000-0000-0000-000000000031',
  '{"removedGoals":["old-goal"],"completedRevisits":["axilla"],"goals":[],"revisits":{}}',
  '2026-10-16 08:00:00Z', null, true), true, 'saves durable goal and revisit markers');

select is(public.save_learner_progress('00000000-0000-0000-0000-000000000031',
  '{"goals":[{"id":"old-goal"},{"id":"other-goal"}],"revisits":{"axilla":{"step":2},"plexus":{"step":0}},"correctAnswers":["new-answer"]}',
  '2026-10-16 09:00:00Z'), true, 'a legacy client can still save unrelated work');
select is((select progress->'removedGoals' from public.learner_progress),
  '["old-goal"]'::jsonb, 'legacy save cannot erase goal removal');
select is((select progress->'completedRevisits' from public.learner_progress),
  '["axilla"]'::jsonb, 'legacy save cannot erase revisit completion');
select is((select progress->'goals' from public.learner_progress),
  '[{"id":"other-goal"}]'::jsonb, 'only the removed goal stays removed');
select is((select progress->'revisits' from public.learner_progress),
  '{"plexus":{"step":0}}'::jsonb, 'only the finished revisit stays finished');
select is((select progress->'correctAnswers' from public.learner_progress),
  '["new-answer"]'::jsonb, 'unrelated legacy study is retained');
select is(public.save_learner_progress('00000000-0000-0000-0000-000000000031',
  '{"goals":[{"id":"old-goal"},{"id":"other-goal"}],"revisits":{"axilla":{"step":2},"plexus":{"step":0}},"correctAnswers":["new-answer"]}',
  '2026-10-16 09:00:00Z'), true, 'identical legacy retry remains idempotent after normalization');

select is(public.save_learner_progress('00000000-0000-0000-0000-000000000031',
  '{"removedGoals":["other-goal"],"completedRevisits":["plexus"],"goals":[{"id":"old-goal"}],"revisits":{"axilla":{"step":2}}}',
  '2026-10-16 10:00:00Z', '2026-10-16 09:00:00Z', true), true, 'versioned save joins markers inside the write');
select is((select progress->'removedGoals' from public.learner_progress),
  '["old-goal","other-goal"]'::jsonb, 'independent goal removals are joined');
select is((select progress->'completedRevisits' from public.learner_progress),
  '["axilla","plexus"]'::jsonb, 'independent final revisits are joined');
select is((select progress->'goals' from public.learner_progress),
  '[]'::jsonb, 'a versioned save cannot restore a removed goal');
select is((select progress->'revisits' from public.learner_progress),
  '{}'::jsonb, 'a versioned save cannot restore a finished revisit');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000032","role":"authenticated"}', true);
-- This row predates the migration: retries must compare normalized values on both sides.
insert into public.learner_progress (user_id, progress, updated_at)
values ('00000000-0000-0000-0000-000000000032', '{"completedLessons":["axilla"]}', '2026-10-16 08:00:00Z');
select is(public.save_learner_progress('00000000-0000-0000-0000-000000000032',
  '{"completedLessons":["axilla"]}', '2026-10-16 08:00:00Z'),
  true, 'a legacy row saved before this migration can be retried at the same version');
select is(public.save_learner_progress('00000000-0000-0000-0000-000000000032',
  '{"completedLessons":["different"]}', '2026-10-16 08:00:00Z'),
  false, 'different same-version legacy study still conflicts');

select * from finish();
rollback;
