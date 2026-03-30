-- ============================================================
-- Pakistani Myth Guider — Row Level Security Policies
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.myths enable row level security;
alter table public.stories enable row level security;
alter table public.comments enable row level security;
alter table public.votes enable row level security;

-- ============================================================
-- PROFILES
-- ============================================================

-- Everyone can read profiles
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can update any profile (e.g. role changes)
create policy "Admins can update any profile"
  on public.profiles for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- MYTHS
-- ============================================================

-- Anyone can read myths (public content)
create policy "Myths are viewable by everyone"
  on public.myths for select using (true);

-- Admins can insert myths
create policy "Admins can insert myths"
  on public.myths for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Admins can update myths
create policy "Admins can update myths"
  on public.myths for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Admins can delete myths
create policy "Admins can delete myths"
  on public.myths for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- STORIES
-- ============================================================

-- Anyone can read published stories
create policy "Published stories are viewable by everyone"
  on public.stories for select using (status = 'published');

-- Admins/moderators can see all stories (including pending)
create policy "Admins and moderators see all stories"
  on public.stories for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'moderator'))
  );

-- Authenticated users can submit stories
create policy "Authenticated users can submit stories"
  on public.stories for insert with check (auth.uid() is not null);

-- Admins can update stories (publish, edit)
create policy "Admins can update stories"
  on public.stories for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Admins can delete stories
create policy "Admins can delete stories"
  on public.stories for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- COMMENTS
-- ============================================================

-- Anyone can read approved comments
create policy "Approved comments are viewable by everyone"
  on public.comments for select using (status = 'approved');

-- Admins/moderators can see all comments (including pending)
create policy "Admins and moderators see all comments"
  on public.comments for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'moderator'))
  );

-- Authenticated users can insert comments
create policy "Authenticated users can comment"
  on public.comments for insert with check (auth.uid() is not null);

-- Admins/moderators can update comments (approve/reject)
create policy "Admins and moderators can moderate comments"
  on public.comments for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'moderator'))
  );

-- Admins can delete comments
create policy "Admins can delete comments"
  on public.comments for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- VOTES
-- ============================================================

-- Anyone can read votes
create policy "Votes are viewable by everyone"
  on public.votes for select using (true);

-- Authenticated users can insert their own votes
create policy "Authenticated users can vote"
  on public.votes for insert with check (auth.uid() = user_id);

-- Users can update their own vote
create policy "Users can update own vote"
  on public.votes for update using (auth.uid() = user_id);

-- Users can delete their own vote
create policy "Users can delete own vote"
  on public.votes for delete using (auth.uid() = user_id);
