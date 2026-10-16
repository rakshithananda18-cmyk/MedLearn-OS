-- Removal/completion is monotonic: never expire these markers while an older phone may
-- reconnect. Merge them inside the row write so a legacy client cannot erase them.
create function public.merge_progress_deletions(p_progress jsonb, p_saved jsonb)
returns jsonb
language plpgsql
immutable
security invoker
set search_path = ''
as $$
declare
  deleted jsonb;
  completed jsonb;
begin
  select coalesce(jsonb_agg(value order by value), '[]'::jsonb) into deleted
  from (
    select value from jsonb_array_elements(coalesce(p_progress->'deletedGoalIds', '[]'::jsonb))
    union
    select value from jsonb_array_elements(coalesce(p_saved->'deletedGoalIds', '[]'::jsonb))
  ) as ids;
  select coalesce(jsonb_agg(value order by value), '[]'::jsonb) into completed
  from (
    select value from jsonb_array_elements(coalesce(p_progress->'completedRevisits', '[]'::jsonb))
    union
    select value from jsonb_array_elements(coalesce(p_saved->'completedRevisits', '[]'::jsonb))
  ) as ids;
  -- Refuse an oversized merge instead of silently dropping a marker and reviving old work.
  if jsonb_array_length(deleted) > 5000 or jsonb_array_length(completed) > 5000 then
    raise exception 'Too many progress removal markers' using errcode = '22023';
  end if;
  return p_progress || jsonb_build_object(
    'deletedGoalIds', deleted,
    'completedRevisits', completed,
    'goals', (
      select coalesce(jsonb_agg(goal order by ordinal), '[]'::jsonb)
      from jsonb_array_elements(coalesce(p_progress->'goals', '[]'::jsonb))
        with ordinality as goals(goal, ordinal)
      where not (deleted ? (goal->>'id'))
    ),
    'revisits', (
      select coalesce(jsonb_object_agg(slug, revisit), '{}'::jsonb)
      from jsonb_each(coalesce(p_progress->'revisits', '{}'::jsonb)) as revisits(slug, revisit)
      where not (completed ? slug)
    )
  );
end;
$$;

comment on function public.merge_progress_deletions is
  'Preserves durable goal deletions and revisit completion when normalizing a progress save.';
revoke all on function public.merge_progress_deletions from public, anon;
grant execute on function public.merge_progress_deletions to authenticated;

create or replace function public.save_learner_progress(
  p_user_id uuid,
  p_progress jsonb,
  p_updated_at timestamptz,
  p_expected_updated_at timestamptz default null,
  p_check_version boolean default false
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if p_check_version then
    if p_expected_updated_at is null then
      insert into public.learner_progress (user_id, progress, updated_at)
      values (p_user_id, public.merge_progress_deletions(p_progress, '{}'::jsonb), p_updated_at)
      on conflict (user_id) do nothing;
    else
      update public.learner_progress
      set progress = public.merge_progress_deletions(p_progress, progress), updated_at = p_updated_at
      where user_id = p_user_id
        and updated_at = p_expected_updated_at
        and (updated_at < p_updated_at or (updated_at = p_updated_at
          and public.merge_progress_deletions(progress, '{}'::jsonb)
            = public.merge_progress_deletions(p_progress, progress)));
    end if;
  else
    -- Keep legacy timestamps and equal-version retry protection; normalize before comparison.
    insert into public.learner_progress (user_id, progress, updated_at)
    values (p_user_id, public.merge_progress_deletions(p_progress, '{}'::jsonb), p_updated_at)
    on conflict (user_id) do update
      set progress = public.merge_progress_deletions(excluded.progress, learner_progress.progress),
        updated_at = excluded.updated_at
      where learner_progress.updated_at < excluded.updated_at
        or (learner_progress.updated_at = excluded.updated_at
          and public.merge_progress_deletions(learner_progress.progress, '{}'::jsonb)
            = public.merge_progress_deletions(excluded.progress, learner_progress.progress));
  end if;
  return found;
end;
$$;

comment on function public.save_learner_progress is
  'Atomically saves learner progress with durable removal markers, returning false on version conflict. RLS applies.';
