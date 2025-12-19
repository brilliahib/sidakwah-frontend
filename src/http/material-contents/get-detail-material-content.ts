import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MaterialContent } from "@/types/material-contents/material-content";

interface GetDetailMaterialContentResponse {
  data: MaterialContent;
}

export const GetDetailMaterialContentHandler = async (
  id: number,
  token: string
): Promise<GetDetailMaterialContentResponse> => {
  const { data } = await api.get<GetDetailMaterialContentResponse>(
    `/material-contents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetDetailMaterialContent = (
  id: number,
  token: string,
  options?: Partial<
    UseQueryOptions<GetDetailMaterialContentResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["get-detail-material-content", id],
    queryFn: () => GetDetailMaterialContentHandler(id, token),
    ...options,
  });
};
