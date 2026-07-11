import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

export const deleteCommentHandler = async (
  id: number,
  token: string
) => {
  const { data } = await api.delete(`/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteComment = (
  options?: UseMutationOptions<unknown, AxiosError, { id: number }>
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: ({ id }) =>
      deleteCommentHandler(id, session?.access_token ?? ""),
    ...options,
  });
};