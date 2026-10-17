import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse } from "@/types/metadata/metadata";
import { MaterialContentRevision, MaterialDecision } from "@/types/material-contents/material-content-revision";

interface DecisionResponse {
  data: MaterialContentRevision;
}

export interface DecideMaterialRevisionInput {
  id: number;
  decision: MaterialDecision;
  reason?: string;
}

export async function decideMaterialContentRevision(
  input: DecideMaterialRevisionInput,
  token: string,
): Promise<DecisionResponse> {
  const { data } = await api.patch<DecisionResponse>(
    `/material-content-revisions/${input.id}/decision`,
    { decision: input.decision, reason: input.reason },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return data;
}

export function useDecideMaterialContentRevision(
  options?: UseMutationOptions<DecisionResponse, AxiosError<ErrorResponse>, DecideMaterialRevisionInput>,
) {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (input) => decideMaterialContentRevision(input, session?.access_token ?? ""),
    ...options,
  });
}
