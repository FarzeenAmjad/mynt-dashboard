import { supabase } from '@/lib/supabase';
import type { MythInsert, MythUpdate } from '@/types/supabase';

export interface MythFilters {
  category?: string;
  status?: string;
  search?: string;
  orderBy?: 'views' | 'published_at' | 'likes';
  limit?: number;
  offset?: number;
}

export async function fetchMyths(filters: MythFilters = {}) {
  let query = supabase.from('myths').select('*');

  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const orderCol = filters.orderBy || 'published_at';
  query = query.order(orderCol, { ascending: false });

  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchMythById(id: string) {
  const { data, error } = await supabase
    .from('myths')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createMyth(myth: MythInsert) {
  const { data, error } = await supabase
    .from('myths')
    .insert(myth)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateMyth(id: string, updates: MythUpdate) {
  const { data, error } = await supabase
    .from('myths')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMyth(id: string) {
  const { error } = await supabase.from('myths').delete().eq('id', id);
  if (error) throw error;
}

export async function fetchMythCategoryCounts() {
  const { data, error } = await supabase
    .from('myths')
    .select('category');
  if (error) throw error;

  const counts: Record<string, number> = {};
  data.forEach((row) => {
    counts[row.category] = (counts[row.category] || 0) + 1;
  });
  return counts;
}

export async function incrementMythViews(id: string) {
  await supabase.rpc('increment_myth_views', { p_myth_id: id });
}
