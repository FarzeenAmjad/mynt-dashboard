-- ============================================================
-- Pakistani Myth Guider — Postgres Functions
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- CAST MYTH VOTE (atomic toggle: like/dislike/remove)
-- ============================================================
create or replace function public.cast_myth_vote(
  p_myth_id uuid,
  p_user_id uuid,
  p_vote_type text
)
returns void
language plpgsql
security definer
as $$
declare
  v_existing text;
begin
  -- Check existing vote
  select vote_type into v_existing
    from public.votes
    where myth_id = p_myth_id and user_id = p_user_id;

  if v_existing is null then
    -- No existing vote: insert new
    insert into public.votes (user_id, myth_id, vote_type)
      values (p_user_id, p_myth_id, p_vote_type);
    if p_vote_type = 'like' then
      update public.myths set likes = likes + 1 where id = p_myth_id;
    else
      update public.myths set dislikes = dislikes + 1 where id = p_myth_id;
    end if;

  elsif v_existing = p_vote_type then
    -- Same vote again: remove it (toggle off)
    delete from public.votes where myth_id = p_myth_id and user_id = p_user_id;
    if p_vote_type = 'like' then
      update public.myths set likes = greatest(likes - 1, 0) where id = p_myth_id;
    else
      update public.myths set dislikes = greatest(dislikes - 1, 0) where id = p_myth_id;
    end if;

  else
    -- Different vote: switch
    update public.votes set vote_type = p_vote_type
      where myth_id = p_myth_id and user_id = p_user_id;
    if p_vote_type = 'like' then
      update public.myths set likes = likes + 1, dislikes = greatest(dislikes - 1, 0) where id = p_myth_id;
    else
      update public.myths set likes = greatest(likes - 1, 0), dislikes = dislikes + 1 where id = p_myth_id;
    end if;
  end if;
end;
$$;

-- ============================================================
-- CAST STORY VOTE (atomic toggle: like/remove)
-- ============================================================
create or replace function public.cast_story_vote(
  p_story_id uuid,
  p_user_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
  v_exists boolean;
begin
  select exists(
    select 1 from public.votes
    where story_id = p_story_id and user_id = p_user_id
  ) into v_exists;

  if v_exists then
    -- Already liked: remove vote
    delete from public.votes where story_id = p_story_id and user_id = p_user_id;
    update public.stories set likes = greatest(likes - 1, 0) where id = p_story_id;
  else
    -- Not liked: add vote
    insert into public.votes (user_id, story_id, vote_type)
      values (p_user_id, p_story_id, 'like');
    update public.stories set likes = likes + 1 where id = p_story_id;
  end if;
end;
$$;

-- ============================================================
-- INCREMENT MYTH VIEWS (fire-and-forget)
-- ============================================================
create or replace function public.increment_myth_views(p_myth_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.myths set views = views + 1 where id = p_myth_id;
end;
$$;
