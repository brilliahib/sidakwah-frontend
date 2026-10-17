import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MaterialContent, MaterialRevisionStatus } from "@/types/material-contents/material-content";

export type ManagedMaterialStatus = MaterialRevisionStatus | "published";

interface ManagedMaterialsResponse {
  data: MaterialContent[];
}

export const managedMaterialKeys = {
  all: ["managed-material-contents"] as const,
  list: (scope: string | number, status: ManagedMaterialStatus | "all") => [...managedMaterialKeys.all, scope, "list", status] as const,
  detail: (scope: string | number, id: number) => [...managedMaterialKeys.all, scope, "detail", id] as const,
};

export async function getManagedMaterialContents(
  token: string,
  status: ManagedMaterialStatus | "all",
): Promise<ManagedMaterialsResponse> {
  const { data } = await api.get<ManagedMaterialsResponse>("/material-contents/management", {
    headers: { Authorization: `Bearer ${token}` },
    params: status === "all" ? undefined : { status },
  });
  return data;
}

export function useGetManagedMaterialContents(
  token: string,
  status: ManagedMaterialStatus | "all",
  scope: string | number,
  options?: Partial<UseQueryOptions<ManagedMaterialsResponse, AxiosError>>,
) {
  return useQuery({
    queryKey: managedMaterialKeys.list(scope, status),
    queryFn: () => getManagedMaterialContents(token, status),
    ...options,
  });
}
