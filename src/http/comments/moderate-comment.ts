import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Comment } from "@/types/comments/comment";
import { useSession } from "next-auth/react";

export type CommentModerationStatus = Extract<Comment["status"], "approved" | "rejected">;

interface ModerateCommentInput {
  id: number;
  status: CommentModerationStatus;
}

interface ModerateCommentResponse {
  data: Comment;
}

export const moderateCommentHandler = async (
  input: ModerateCommentInput,
  token: string,
): Promise<ModerateCommentResponse> => {
  const { data } = await api.patch<ModerateCommentResponse>(
    `/comments/${input.id}/moderation`,
    { status: input.status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useModerateComment = (
  options?: UseMutationOptions<ModerateCommentResponse, AxiosError, ModerateCommentInput>,
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (input) => moderateCommentHandler(input, session?.access_token ?? ""),
    ...options,
  });
};
