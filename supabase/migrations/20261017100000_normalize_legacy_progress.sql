-- Compatibility with released removedGoals and finishedRevisit(step >= 3) records, plus the
-- temporary deletedGoalIds spelling. Normalize both sides before any atomic save comparison.
create or replace function public.merge_progress_deletions(p_progress jsonb, p_saved jsonb)
returns jsonb
language plpgsql
immutable
security invoker
set search_path = ''
as $$
declare
  removed jsonb;
  completed jsonb;
begin
  select coalesce(jsonb_agg(value order by value), '[]'::jsonb) into removed
  from (
    select value from jsonb_array_elements(coalesce(p_progress->'removedGoals', '[]'::jsonb))
    union
    select value from jsonb_array_elements(coalesce(p_saved->'removedGoals', '[]'::jsonb))
    union
    select value from jsonb_array_elements(coalesce(p_progress->'deletedGoalIds', '[]'::jsonb))
    union
    select value from jsonb_array_elements(coalesce(p_saved->'deletedGoalIds', '[]'::jsonb))
  ) as ids;
  select coalesce(jsonb_agg(value order by value), '[]'::jsonb) into completed
  from (
    select value from jsonb_array_elements(coalesce(p_progress->'completedRevisits', '[]'::jsonb))
    union
    select value from jsonb_array_elements(coalesce(p_saved->'completedRevisits', '[]'::jsonb))
    union
    select to_jsonb(slug) from (
      select * from jsonb_each(coalesce(p_progress->'revisits', '{}'::jsonb))
      union all
      select * from jsonb_each(coalesce(p_saved->'revisits', '{}'::jsonb))
    ) as revisits(slug, revisit)
    where case when jsonb_typeof(revisit->'step') = 'number'
      then (revisit->>'step')::numeric >= 3 else false end
  ) as ids;
  if jsonb_array_length(removed) > 5000 or jsonb_array_length(completed) > 5000 then
    raise exception 'Too many progress removal markers' using errcode = '22023';
  end if;
  return (p_progress - 'deletedGoalIds') || jsonb_build_object(
    'removedGoals', removed,
    'completedRevisits', completed,
    'goals', (
      select coalesce(jsonb_agg(goal order by ordinal), '[]'::jsonb)
      from jsonb_array_elements(coalesce(p_progress->'goals', '[]'::jsonb))
        with ordinality as goals(goal, ordinal)
      where not (removed ? (goal->>'id'))
    ),
    'revisits', (
      select coalesce(jsonb_object_agg(slug, revisit), '{}'::jsonb)
      from jsonb_each(coalesce(p_progress->'revisits', '{}'::jsonb)) as revisits(slug, revisit)
      where not (completed ? slug)
    )
  );
end;
$$;

-- Preserve compare-and-swap tokens while bringing already-saved rows onto the canonical format.
update public.learner_progress
set progress = public.merge_progress_deletions(progress, '{}'::jsonb);
