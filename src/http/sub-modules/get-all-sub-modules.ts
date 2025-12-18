import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubModules } from "@/types/sub-modules/sub-modules";

interface GetAllSubModulesResponse {
  data: SubModules[];
}

export const GetAllSubModulesHandler = async (
  token: string
): Promise<GetAllSubModulesResponse> => {
  const { data } = await api.get<GetAllSubModulesResponse>("/sub-modules", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllSubModules = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllSubModulesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["get-all-sub-modules"],
    queryFn: () => GetAllSubModulesHandler(token),
    ...options,
  });
};
