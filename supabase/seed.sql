-- Local development and test data. Loaded by `supabase db reset`.

insert into public.subjects (slug, name, sort_order) values
  ('anatomy', 'Anatomy', 1),
  ('physiology', 'Physiology', 2),
  ('biochemistry', 'Biochemistry', 3);
