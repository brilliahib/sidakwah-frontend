import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MaterialContent } from "@/types/material-contents/material-content";

interface GetAllMaterialContentResponse {
  data: MaterialContent[];
}

export const GetAllMaterialContentHandler = async (
  token: string
): Promise<GetAllMaterialContentResponse> => {
  const { data } = await api.get<GetAllMaterialContentResponse>(
    "/material-contents",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllMaterialContent = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllMaterialContentResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["get-all-material-contents"],
    queryFn: () => GetAllMaterialContentHandler(token),
    ...options,
  });
};
