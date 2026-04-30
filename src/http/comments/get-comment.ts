import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Comment } from "@/types/comments/comment";

interface GetCommentResponse {
  data: Comment[];
}

export const GetCommentHandler = async (
  token: string,
): Promise<GetCommentResponse> => {
  const { data } = await api.get<GetCommentResponse>(`/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetComment = (
  token: string,
  options?: Partial<UseQueryOptions<GetCommentResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-comment"],
    queryFn: () => GetCommentHandler(token),
    ...options,
  });
};
