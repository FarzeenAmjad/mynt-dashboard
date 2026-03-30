import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchComments,
  fetchAllComments,
  createComment,
  updateCommentStatus,
  deleteComment,
  type CommentFilters,
} from '@/services/comments';
import type { CommentInsert } from '@/types/supabase';

export function useComments(filters: CommentFilters = {}) {
  return useQuery({
    queryKey: ['comments', filters],
    queryFn: () => fetchComments(filters),
  });
}

export function useAllComments() {
  return useQuery({
    queryKey: ['comments', 'all'],
    queryFn: fetchAllComments,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: CommentInsert) => createComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}

export function useApproveComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateCommentStatus(id, 'approved'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}
