import { supabase } from '@/lib/supabase';

export async function castMythVote(mythId: string, userId: string, voteType: 'like' | 'dislike') {
  const { error } = await supabase.rpc('cast_myth_vote', {
    p_myth_id: mythId,
    p_user_id: userId,
    p_vote_type: voteType,
  });
  if (error) throw error;
}

export async function castStoryVote(storyId: string, userId: string) {
  const { error } = await supabase.rpc('cast_story_vote', {
    p_story_id: storyId,
    p_user_id: userId,
  });
  if (error) throw error;
}

export async function getUserMythVote(mythId: string, userId: string) {
  const { data, error } = await supabase
    .from('votes')
    .select('vote_type')
    .eq('myth_id', mythId)
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data?.vote_type ?? null;
}

export async function getUserStoryVote(storyId: string, userId: string) {
  const { data, error } = await supabase
    .from('votes')
    .select('vote_type')
    .eq('story_id', storyId)
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data ? true : false;
}
