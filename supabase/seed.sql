-- Local development and test data. Loaded by `supabase db reset`.

insert into public.subjects (slug, name, sort_order) values
  ('anatomy', 'Anatomy', 1),
  ('physiology', 'Physiology', 2),
  ('biochemistry', 'Biochemistry', 3);

-- A reviewer for local development and the integration tests (sign up with this email).
insert into public.content_reviewers (email) values ('reviewer@example.com');
