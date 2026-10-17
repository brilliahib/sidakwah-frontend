import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MaterialContent } from "@/types/material-contents/material-content";
import { managedMaterialKeys } from "./get-managed-material-contents";

interface ManagedMaterialResponse {
  data: MaterialContent;
}

export async function getManagedMaterialContentDetail(
  id: number,
  token: string,
): Promise<ManagedMaterialResponse> {
  const { data } = await api.get<ManagedMaterialResponse>(`/material-contents/management/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export function useGetManagedMaterialContentDetail(
  id: number,
  token: string,
  scope: string | number,
  options?: Partial<UseQueryOptions<ManagedMaterialResponse, AxiosError>>,
) {
  return useQuery({
    queryKey: managedMaterialKeys.detail(scope, id),
    queryFn: () => getManagedMaterialContentDetail(id, token),
    ...options,
  });
}
