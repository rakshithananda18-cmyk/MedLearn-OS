begin;
create extension if not exists pgtap with schema extensions;
select plan(8);

select is(public.merge_progress_deletions(
  '{"removedGoals":["main-goal"],"deletedGoalIds":["codex-goal"],"goals":[{"id":"main-goal"},{"id":"codex-goal"},{"id":"keep"}]}', '{}')->'removedGoals',
  '["codex-goal","main-goal"]'::jsonb, 'both goal marker spellings normalize into the released name');
select is(public.merge_progress_deletions(
  '{"revisits":{"finished":{"step":3,"due":"9999-12-31"},"active":{"step":1,"due":"2026-10-18"}}}', '{}')->'completedRevisits',
  '["finished"]'::jsonb, 'incoming terminal revisits become durable completion markers');
select is(public.merge_progress_deletions(
  '{"revisits":{"finished":{"step":0}}}', '{"revisits":{"finished":{"step":3,"due":"9999-12-31"}}}')->'revisits',
  '{}'::jsonb, 'a saved terminal revisit defeats an old incoming schedule');
select is(public.merge_progress_deletions(
  '{"goals":[{"id":"main-goal"},{"id":"keep"}]}', '{"removedGoals":["main-goal"]}')->'goals',
  '[{"id":"keep"}]'::jsonb, 'released removedGoals defeat an old incoming goal');
select ok(not (public.merge_progress_deletions('{"deletedGoalIds":["old"]}', '{}') ? 'deletedGoalIds'),
  'canonical persisted output drops the compatibility alias');

insert into auth.users (id) values ('00000000-0000-0000-0000-000000000033');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000033","role":"authenticated"}', true);
insert into public.learner_progress (user_id, progress, updated_at)
values ('00000000-0000-0000-0000-000000000033',
  '{"removedGoals":["removed"],"revisits":{"finished":{"step":3,"due":"9999-12-31"}}}', '2026-10-17 08:00:00Z');
select is(public.save_learner_progress('00000000-0000-0000-0000-000000000033',
  '{"goals":[{"id":"removed"}],"revisits":{"finished":{"step":0}},"correctAnswers":["new"]}',
  '2026-10-17 09:00:00Z'), true, 'a newer legacy client can save study alongside old terminal state');
select is((select progress->'completedRevisits' from public.learner_progress),
  '["finished"]'::jsonb, 'legacy save retains completion from a previously saved terminal row');
select is((select progress->'goals' from public.learner_progress),
  '[]'::jsonb, 'legacy save retains the previously removed goal');

select * from finish();
rollback;
