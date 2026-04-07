import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMythSubmissions,
  createMythSubmission,
  updateMythSubmission,
  deleteMythSubmission,
  type MythSubmissionFilters,
} from '@/services/mythSubmissions';
import type { MythSubmissionInsert, MythSubmissionUpdate } from '@/types/supabase';

export function useMythSubmissions(filters: MythSubmissionFilters = {}) {
  return useQuery({
    queryKey: ['mythSubmissions', filters],
    queryFn: () => fetchMythSubmissions(filters),
  });
}

export function useCreateMythSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (submission: MythSubmissionInsert) => createMythSubmission(submission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mythSubmissions'] });
    },
  });
}

export function useUpdateMythSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: MythSubmissionUpdate }) =>
      updateMythSubmission(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mythSubmissions'] });
    },
  });
}

export function useDeleteMythSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMythSubmission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mythSubmissions'] });
    },
  });
}
