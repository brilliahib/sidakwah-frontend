import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubModules } from "@/types/sub-modules/sub-modules";

interface GetAllSubModulesByModulesResponse {
  data: SubModules[];
}

export const GetAllSubModulesByModulesHandler = async (
  id: number,
  token: string
): Promise<GetAllSubModulesByModulesResponse> => {
  const { data } = await api.get<GetAllSubModulesByModulesResponse>(
    `/sub-modules/modul/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllSubModulesByModules = (
  id: number,
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllSubModulesByModulesResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["get-all-sub-modules-by-modules", id],
    queryFn: () => GetAllSubModulesByModulesHandler(id, token),
    ...options,
  });
};
