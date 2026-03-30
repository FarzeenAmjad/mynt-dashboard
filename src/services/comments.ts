import { supabase } from '@/lib/supabase';
import type { CommentInsert } from '@/types/supabase';

export interface CommentFilters {
  mythId?: string;
  storyId?: string;
  status?: string;
}

export async function fetchComments(filters: CommentFilters = {}) {
  let query = supabase.from('comments').select('*');

  if (filters.mythId) {
    query = query.eq('myth_id', filters.mythId);
  }
  if (filters.storyId) {
    query = query.eq('story_id', filters.storyId);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchAllComments() {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createComment(comment: CommentInsert) {
  const { data, error } = await supabase
    .from('comments')
    .insert(comment)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCommentStatus(id: string, status: 'approved' | 'pending') {
  const { data, error } = await supabase
    .from('comments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) throw error;
}
