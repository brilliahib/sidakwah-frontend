import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubModules } from "@/types/sub-modules/sub-modules";

interface GetDetailSubModuleResponse {
  data: SubModules;
}

export const GetDetailSubModuleHandler = async (
  id: number,
  token: string
): Promise<GetDetailSubModuleResponse> => {
  const { data } = await api.get<GetDetailSubModuleResponse>(
    `/sub-modules/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetDetailSubModule = (
  id: number,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailSubModuleResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["get-detail-sub-module", id],
    queryFn: () => GetDetailSubModuleHandler(id, token),
    ...options,
  });
};
