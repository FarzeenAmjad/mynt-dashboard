-- ============================================================
-- Pakistani Myth Guider — Database Schema
-- Run this in Supabase SQL Editor as a single migration
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES TABLE (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup via trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'user')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- MYTHS TABLE
-- ============================================================
create table public.myths (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  summary text,
  content text,
  status text not null default 'debunked' check (status in ('verified', 'debunked', 'partial')),
  category text not null check (category in ('Health', 'Cultural', 'Historical', 'Social')),
  sources jsonb default '[]'::jsonb,
  views integer not null default 0,
  likes integer not null default 0,
  dislikes integer not null default 0,
  published_at timestamptz default now(),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_myths_category on public.myths(category);
create index idx_myths_status on public.myths(status);
create index idx_myths_views on public.myths(views desc);
create index idx_myths_published_at on public.myths(published_at desc);

-- ============================================================
-- STORIES TABLE
-- ============================================================
create table public.stories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  author_name text not null,
  author_id uuid references public.profiles(id),
  content text,
  full_content text,
  category text not null check (category in ('Folklore', 'Supernatural', 'Urban Legends', 'Historical', 'Regional')),
  status text not null default 'pending' check (status in ('published', 'pending')),
  likes integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_stories_category on public.stories(category);
create index idx_stories_status on public.stories(status);
create index idx_stories_published_at on public.stories(published_at desc);

-- ============================================================
-- COMMENTS TABLE (polymorphic: myth_id OR story_id)
-- ============================================================
create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id),
  user_name text not null,
  content text not null,
  myth_id uuid references public.myths(id) on delete cascade,
  story_id uuid references public.stories(id) on delete cascade,
  status text not null default 'pending' check (status in ('approved', 'pending')),
  created_at timestamptz not null default now(),
  constraint comment_target check (
    (myth_id is not null and story_id is null) or
    (myth_id is null and story_id is not null)
  )
);

create index idx_comments_myth on public.comments(myth_id) where myth_id is not null;
create index idx_comments_story on public.comments(story_id) where story_id is not null;
create index idx_comments_status on public.comments(status);

-- ============================================================
-- VOTES TABLE (like/dislike for myths, like for stories)
-- ============================================================
create table public.votes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  myth_id uuid references public.myths(id) on delete cascade,
  story_id uuid references public.stories(id) on delete cascade,
  vote_type text not null check (vote_type in ('like', 'dislike')),
  created_at timestamptz not null default now(),
  constraint vote_target check (
    (myth_id is not null and story_id is null) or
    (myth_id is null and story_id is not null)
  ),
  constraint unique_myth_vote unique (user_id, myth_id),
  constraint unique_story_vote unique (user_id, story_id)
);

-- ============================================================
-- UPDATED_AT TRIGGER (reusable)
-- ============================================================
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.myths
  for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.stories
  for each row execute function public.update_updated_at();
