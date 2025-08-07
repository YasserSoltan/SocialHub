import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createLike, fetchLike, fetchLikes } from '../api/likesApi';

export const useLikes = () => {
  return useQuery({
    queryKey: ['likes'],
    queryFn: () => fetchLikes(),
  });
};

export const useLike = (likeId) => {
  return useQuery({
    queryKey: ['likes', likeId],
    queryFn: () => fetchLike(likeId),
  });
};

export const useCreateLike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createLike,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    }
  });
};