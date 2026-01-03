import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Comment } from "@/types/comments/comment";

interface GetAllCommentResponse {
  data: Comment[];
}

export const GetAllCommentHandler = async (
  id: number,
  token: string
): Promise<GetAllCommentResponse> => {
  const { data } = await api.get<GetAllCommentResponse>(
    `/comments/material-content/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllComment = (
  id: number,
  token: string,
  options?: Partial<UseQueryOptions<GetAllCommentResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["get-all-comments", id],
    queryFn: () => GetAllCommentHandler(id, token),
    ...options,
  });
};
