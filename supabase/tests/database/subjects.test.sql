begin;
create extension if not exists pgtap with schema extensions;

select plan(7);

select has_table('public', 'subjects', 'subjects table exists');
select col_is_unique('public', 'subjects', 'slug', 'slug is unique');
select is(
  (select relrowsecurity from pg_class where oid = 'public.subjects'::regclass),
  true,
  'row-level security is enabled'
);

select throws_ok(
  $$ insert into public.subjects (slug, name, sort_order) values ('Bad Slug', 'Bad', 9) $$,
  '23514',
  null,
  'slug must be lowercase kebab-case'
);

set local role anon;

select results_eq(
  'select slug from public.subjects order by sort_order',
  array['anatomy', 'physiology', 'biochemistry'],
  'anonymous users can read subjects in teaching order'
);

select throws_ok(
  $$ insert into public.subjects (slug, name, sort_order) values ('pathology', 'Pathology', 4) $$,
  '42501',
  null,
  'anonymous users cannot insert subjects'
);

set local role authenticated;

select is_empty(
  $$ update public.subjects set name = 'Changed' where slug = 'anatomy' returning id $$,
  'signed-in users cannot update subjects'
);

select * from finish();
rollback;
