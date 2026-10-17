-- Local development and test data. Loaded by `supabase db reset`.

insert into public.subjects (slug, name, sort_order) values
  ('anatomy', 'Anatomy', 1),
  ('physiology', 'Physiology', 2),
  ('biochemistry', 'Biochemistry', 3);

-- A reviewer for local development and the integration tests (sign up with this email).
insert into public.content_reviewers (email, qualification)
  values ('reviewer@example.com', 'MBBS, anatomy tutor');

-- An admin for local development and the integration tests (sign up with this email).
insert into public.app_admins (email) values ('admin@example.com');
