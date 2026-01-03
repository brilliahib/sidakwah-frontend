import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CommentType } from "@/validators/comment/comment-validator";

export const createCommentHandler = async (
  body: CommentType,
  token: string
) => {
  const { data } = await api.post("/comments", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateComment = (
  options?: UseMutationOptions<unknown, AxiosError, CommentType>
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      createCommentHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
