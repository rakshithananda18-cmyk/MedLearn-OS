-- Subjects are curriculum reference data (Anatomy, Physiology, ...).
-- Everyone may read them; only migrations and the service role may change them.

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 80),
  sort_order smallint not null,
  created_at timestamptz not null default now()
);

comment on table public.subjects is 'MBBS subjects in teaching order.';

alter table public.subjects enable row level security;

create policy "Subjects are readable by everyone"
  on public.subjects
  for select
  to anon, authenticated
  using (true);
