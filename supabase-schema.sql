-- Run this in Supabase SQL Editor to create private per-user StudyMate storage.
create table if not exists public.studymate_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.studymate_data enable row level security;
revoke all on table public.studymate_data from anon, authenticated;
grant select, insert, update, delete on table public.studymate_data to authenticated;

drop policy if exists "Users can read their own StudyMate data" on public.studymate_data;
create policy "Users can read their own StudyMate data"
  on public.studymate_data for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can add their own StudyMate data" on public.studymate_data;
create policy "Users can add their own StudyMate data"
  on public.studymate_data for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own StudyMate data" on public.studymate_data;
create policy "Users can update their own StudyMate data"
  on public.studymate_data for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own StudyMate data" on public.studymate_data;
create policy "Users can delete their own StudyMate data"
  on public.studymate_data for delete to authenticated
  using ((select auth.uid()) = user_id);
