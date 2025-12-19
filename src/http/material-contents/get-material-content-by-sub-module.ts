import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MaterialContent } from "@/types/material-contents/material-content";

interface GetMaterialContentBySubModuleResponse {
  data: MaterialContent[];
}

export const GetMaterialContentBySubModuleHandler = async (
  id: number,
  token: string
): Promise<GetMaterialContentBySubModuleResponse> => {
  const { data } = await api.get<GetMaterialContentBySubModuleResponse>(
    `/material-contents/sub-modul/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetMaterialContentBySubModule = (
  id: number,
  token: string,
  options?: Partial<
    UseQueryOptions<GetMaterialContentBySubModuleResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["get-material-contents-by-sub-module", id],
    queryFn: () => GetMaterialContentBySubModuleHandler(id, token),
    ...options,
  });
};
