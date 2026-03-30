import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfiles, updateProfileRole } from '@/services/profiles';

export function useProfiles() {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: fetchProfiles,
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: 'user' | 'moderator' | 'admin' }) =>
      updateProfileRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
}
