import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MaterialContentRevision } from "@/types/material-contents/material-content-revision";

interface RevisionListResponse {
  data: MaterialContentRevision[];
}

interface RevisionResponse {
  data: MaterialContentRevision;
}

export const materialContentReviewKeys = {
  all: ["material-content-revisions"] as const,
  pending: (scope: string | number) => [...materialContentReviewKeys.all, scope, "pending"] as const,
  detail: (scope: string | number, id: number) => [...materialContentReviewKeys.all, scope, "detail", id] as const,
};

export async function getPendingMaterialContentRevisions(
  token: string,
): Promise<RevisionListResponse> {
  const { data } = await api.get<RevisionListResponse>("/material-content-revisions", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export function useGetPendingMaterialContentRevisions(
  token: string,
  scope: string | number,
  options?: Partial<UseQueryOptions<RevisionListResponse, AxiosError>>,
) {
  return useQuery({
    queryKey: materialContentReviewKeys.pending(scope),
    queryFn: () => getPendingMaterialContentRevisions(token),
    ...options,
  });
}

export async function getMaterialContentRevision(
  id: number,
  token: string,
): Promise<RevisionResponse> {
  const { data } = await api.get<RevisionResponse>(`/material-content-revisions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export function useGetMaterialContentRevision(
  id: number,
  token: string,
  scope: string | number,
  options?: Partial<UseQueryOptions<RevisionResponse, AxiosError>>,
) {
  return useQuery({
    queryKey: materialContentReviewKeys.detail(scope, id),
    queryFn: () => getMaterialContentRevision(id, token),
    ...options,
  });
}

export async function getMaterialContentRevisionImage(
  id: number,
  token: string,
): Promise<Blob> {
  const { data } = await api.get<Blob>(`/material-content-revisions/${id}/image`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob",
  });
  return data;
}
