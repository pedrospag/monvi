-- Apply once in the SQL editor of a dedicated Monvi Supabase project.
create table if not exists public.monvi_state (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now(),
 constraint monvi_data_object check (jsonb_typeof(data) = 'object')
);
alter table public.monvi_state enable row level security;
create policy "own read" on public.monvi_state for select to authenticated using (auth.uid() = user_id);
create policy "own insert" on public.monvi_state for insert to authenticated with check (auth.uid() = user_id);
create policy "own update" on public.monvi_state for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
revoke all on public.monvi_state from anon;
grant select,insert,update on public.monvi_state to authenticated;
