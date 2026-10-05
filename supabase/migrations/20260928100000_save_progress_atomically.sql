-- A version check and write must be one database operation. Two devices can otherwise
-- both read an old snapshot before either upsert completes.
create function public.save_learner_progress(
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
      values (p_user_id, p_progress, p_updated_at)
      on conflict (user_id) do nothing;
    else
      update public.learner_progress
      set progress = p_progress, updated_at = p_updated_at
      where user_id = p_user_id
        and updated_at = p_expected_updated_at
        and (updated_at < p_updated_at or (updated_at = p_updated_at and progress = p_progress));
    end if;
  else
    -- Older installed clients omit the expected version. Keep their timestamp guard atomic,
    -- including rejecting different payloads with the same version.
    insert into public.learner_progress (user_id, progress, updated_at)
    values (p_user_id, p_progress, p_updated_at)
    on conflict (user_id) do update
      set progress = excluded.progress, updated_at = excluded.updated_at
      where learner_progress.updated_at < excluded.updated_at
        or (learner_progress.updated_at = excluded.updated_at
            and learner_progress.progress = excluded.progress);
  end if;
  return found;
end;
$$;

comment on function public.save_learner_progress is
  'Atomically saves learner progress, returning false on a version conflict. Row-level security applies.';

revoke all on function public.save_learner_progress from public, anon;
grant execute on function public.save_learner_progress to authenticated;
