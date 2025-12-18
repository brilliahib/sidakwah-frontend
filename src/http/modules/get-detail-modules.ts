import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Modules } from "@/types/modules/modules";

interface GetDetailModulesResponse {
  data: Modules;
}

export const GetDetailModulesHandler = async (
  id: number,
  token: string
): Promise<GetDetailModulesResponse> => {
  const { data } = await api.get<GetDetailModulesResponse>(`/modules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailModules = (
  id: number,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailModulesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["get-detail-modules", id],
    queryFn: () => GetDetailModulesHandler(id, token),
    ...options,
  });
};
