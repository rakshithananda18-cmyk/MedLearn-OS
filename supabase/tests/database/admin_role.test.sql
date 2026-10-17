begin;
create extension if not exists pgtap with schema extensions;

select plan(17);

\set admin '00000000-0000-0000-0000-0000000000d1'
\set reviewer '00000000-0000-0000-0000-0000000000d2'
\set student '00000000-0000-0000-0000-0000000000d3'
insert into auth.users (id, email) values
  (:'admin', 'admin.test@example.com'),
  (:'reviewer', 'reviewer.d@example.com'),
  (:'student', 'student.d@example.com');
insert into public.app_admins (email) values ('admin.test@example.com');

select is(
  (select relrowsecurity from pg_class where oid = 'public.app_admins'::regclass),
  true,
  'row-level security is enabled on app_admins'
);

-- A student: not an admin, cannot see or change the team or its log.
set local role authenticated;
select set_config('request.jwt.claims', json_build_object(
  'sub', :'student', 'role', 'authenticated', 'email', 'student.d@example.com')::text, true);

select is(public.is_admin(), false, 'a student is not an admin');
select throws_ok(
  $$ insert into public.content_reviewers (email) values ('student.d@example.com') $$,
  '42501',
  null,
  'a student cannot make themselves a reviewer'
);
select is_empty('select email from public.content_reviewers', 'a student cannot read the team');
select is_empty('select id from public.role_changes', 'a student cannot read the log');
select is_empty('select email from public.app_admins', 'nobody reads the admin list');

-- An admin manages the team.
select set_config('request.jwt.claims', json_build_object(
  'sub', :'admin', 'role', 'authenticated', 'email', 'admin.test@example.com')::text, true);

select is(public.is_admin(), true, 'a listed email is an admin');
select lives_ok(
  $$ insert into public.content_reviewers (email, qualification, added_by)
     values ('reviewer.d@example.com', 'MD Anatomy, faculty', 'someone.else@example.com') $$,
  'an admin adds a reviewer with a qualification'
);
select is(
  (select added_by from public.content_reviewers where email = 'reviewer.d@example.com'),
  'admin.test@example.com',
  'who added a reviewer is stamped from the session'
);
select lives_ok(
  $$ update public.content_reviewers set qualification = 'MD Anatomy, professor'
     where email = 'reviewer.d@example.com' $$,
  'an admin updates a qualification'
);
select throws_ok(
  $$ update public.content_reviewers set email = 'other@example.com'
     where email = 'reviewer.d@example.com' $$,
  '42501',
  null,
  'an email cannot be changed in place'
);
select throws_ok(
  $$ insert into public.app_admins (email) values ('reviewer.d@example.com') $$,
  '42501',
  null,
  'an admin cannot make another admin from the app'
);

-- The reviewer reviews; the review keeps the qualification they had.
select set_config('request.jwt.claims', json_build_object(
  'sub', :'reviewer', 'role', 'authenticated', 'email', 'reviewer.d@example.com')::text, true);
insert into public.topic_reviews (topic_slug, content_version, content_digest, decision, note)
  values ('axilla', '0.1.0', repeat('b', 64), 'changes-requested', 'Check the walls');
select is(
  (select reviewer_qualification from public.topic_reviews where topic_slug = 'axilla'),
  'MD Anatomy, professor',
  'a review records the reviewer''s qualification at the time'
);
select is(public.is_admin(), false, 'a reviewer is not an admin');
select is_empty('select email from public.content_reviewers', 'a reviewer cannot read the team');

-- Back as the admin: removal is logged, and the log shows every change in order.
select set_config('request.jwt.claims', json_build_object(
  'sub', :'admin', 'role', 'authenticated', 'email', 'admin.test@example.com')::text, true);
delete from public.content_reviewers where email = 'reviewer.d@example.com';
select results_eq(
  $$ select action, changed_by from public.role_changes
     where email = 'reviewer.d@example.com' order by id $$,
  $$ values ('added', 'admin.test@example.com'), ('updated', 'admin.test@example.com'),
       ('removed', 'admin.test@example.com') $$,
  'every change to the team is logged with who made it'
);
select throws_ok(
  $$ delete from public.role_changes $$,
  '42501',
  null,
  'the log cannot be erased from the app'
);

select * from finish();
rollback;
