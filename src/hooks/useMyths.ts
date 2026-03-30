import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMyths,
  fetchMythById,
  createMyth,
  updateMyth,
  deleteMyth,
  fetchMythCategoryCounts,
  incrementMythViews,
  type MythFilters,
} from '@/services/myths';
import type { MythInsert, MythUpdate } from '@/types/supabase';

export function useMyths(filters: MythFilters = {}) {
  return useQuery({
    queryKey: ['myths', filters],
    queryFn: () => fetchMyths(filters),
  });
}

export function useMyth(id: string) {
  return useQuery({
    queryKey: ['myths', id],
    queryFn: () => fetchMythById(id),
    enabled: !!id,
  });
}

export function useMythCategoryCounts() {
  return useQuery({
    queryKey: ['myths', 'categoryCounts'],
    queryFn: fetchMythCategoryCounts,
  });
}

export function useCreateMyth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (myth: MythInsert) => createMyth(myth),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myths'] });
    },
  });
}

export function useUpdateMyth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: MythUpdate }) =>
      updateMyth(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myths'] });
    },
  });
}

export function useDeleteMyth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMyth(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myths'] });
    },
  });
}

export function useIncrementViews() {
  return useMutation({
    mutationFn: (id: string) => incrementMythViews(id),
  });
}
