import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, fetchComment, fetchComments } from '../api/commentsApi';

export const useComments = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments(),
  });
};

export const useComment = (commentId) => {
  return useQuery({
    queryKey: ['comments', commentId],
    queryFn: () => fetchComment(commentId),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });
};