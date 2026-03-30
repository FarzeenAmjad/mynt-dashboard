import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchStories,
  fetchStoryById,
  createStory,
  updateStory,
  deleteStory,
  type StoryFilters,
} from '@/services/stories';
import type { StoryInsert, StoryUpdate } from '@/types/supabase';

export function useStories(filters: StoryFilters = {}) {
  return useQuery({
    queryKey: ['stories', filters],
    queryFn: () => fetchStories(filters),
  });
}

export function useStory(id: string) {
  return useQuery({
    queryKey: ['stories', id],
    queryFn: () => fetchStoryById(id),
    enabled: !!id,
  });
}

export function useCreateStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (story: StoryInsert) => createStory(story),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

export function useUpdateStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: StoryUpdate }) =>
      updateStory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

export function useDeleteStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}
