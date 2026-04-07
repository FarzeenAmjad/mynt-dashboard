import { supabase } from '@/lib/supabase';
import type { MythSubmissionInsert, MythSubmissionUpdate } from '@/types/supabase';

export interface MythSubmissionFilters {
  status?: string;
  search?: string;
  limit?: number;
}

export async function fetchMythSubmissions(filters: MythSubmissionFilters = {}) {
  let query = supabase.from('myth_submissions').select('*');

  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  query = query.order('created_at', { ascending: false });

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createMythSubmission(submission: MythSubmissionInsert) {
  const { data, error } = await supabase
    .from('myth_submissions')
    .insert(submission)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateMythSubmission(id: string, updates: MythSubmissionUpdate) {
  const { data, error } = await supabase
    .from('myth_submissions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMythSubmission(id: string) {
  const { error } = await supabase.from('myth_submissions').delete().eq('id', id);
  if (error) throw error;
}
