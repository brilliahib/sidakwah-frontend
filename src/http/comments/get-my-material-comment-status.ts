import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Comment } from "@/types/comments/comment";

interface GetMyMaterialCommentStatusResponse {
  data: Comment[];
}

export const getMyMaterialCommentStatusHandler = async (
  materialContentId: number,
  token: string,
): Promise<GetMyMaterialCommentStatusResponse> => {
  const { data } = await api.get<GetMyMaterialCommentStatusResponse>(
    `/comments/material-content/${materialContentId}/mine`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetMyMaterialCommentStatus = (
  materialContentId: number,
  token: string,
  viewerKey: string,
  options?: Partial<UseQueryOptions<GetMyMaterialCommentStatusResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-comments", materialContentId, viewerKey, "mine"],
    queryFn: () => getMyMaterialCommentStatusHandler(materialContentId, token),
    ...options,
  });
};
