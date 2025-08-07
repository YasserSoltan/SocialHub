import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useUserData = (userToken) => {
    return useQuery({
        queryKey: ['auth', 'user'],
        queryFn: async () => {
            if(!userToken) return null;
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem("userToken");
        },
        onSuccess: () => {
            queryClient.setQueryData(['auth', 'user'], null);
        }
    })
}