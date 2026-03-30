import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { castMythVote, castStoryVote, getUserMythVote, getUserStoryVote } from '@/services/votes';

export function useUserMythVote(mythId: string, userId: string | undefined) {
  return useQuery({
    queryKey: ['votes', 'myth', mythId, userId],
    queryFn: () => getUserMythVote(mythId, userId!),
    enabled: !!userId && !!mythId,
  });
}

export function useUserStoryVote(storyId: string, userId: string | undefined) {
  return useQuery({
    queryKey: ['votes', 'story', storyId, userId],
    queryFn: () => getUserStoryVote(storyId, userId!),
    enabled: !!userId && !!storyId,
  });
}

export function useCastMythVote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mythId, userId, voteType }: { mythId: string; userId: string; voteType: 'like' | 'dislike' }) =>
      castMythVote(mythId, userId, voteType),
    onSuccess: (_, { mythId, userId }) => {
      queryClient.invalidateQueries({ queryKey: ['votes', 'myth', mythId, userId] });
      queryClient.invalidateQueries({ queryKey: ['myths', mythId] });
      queryClient.invalidateQueries({ queryKey: ['myths'] });
    },
  });
}

export function useCastStoryVote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storyId, userId }: { storyId: string; userId: string }) =>
      castStoryVote(storyId, userId),
    onSuccess: (_, { storyId, userId }) => {
      queryClient.invalidateQueries({ queryKey: ['votes', 'story', storyId, userId] });
      queryClient.invalidateQueries({ queryKey: ['stories', storyId] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}
