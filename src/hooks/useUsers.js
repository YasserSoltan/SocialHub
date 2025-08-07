import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, fetchUser, fetchUsers } from '../api/usersApi';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });
};

export const useUser = (userId) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};