import { supabase } from '@/lib/supabase';
import type { StoryInsert, StoryUpdate } from '@/types/supabase';

export interface StoryFilters {
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
}

export async function fetchStories(filters: StoryFilters = {}) {
  let query = supabase.from('stories').select('*');

  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  query = query.order('published_at', { ascending: false, nullsFirst: false });

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchStoryById(id: string) {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createStory(story: StoryInsert) {
  const { data, error } = await supabase
    .from('stories')
    .insert(story)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateStory(id: string, updates: StoryUpdate) {
  const { data, error } = await supabase
    .from('stories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteStory(id: string) {
  const { error } = await supabase.from('stories').delete().eq('id', id);
  if (error) throw error;
}
