import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Modules } from "@/types/modules/modules";
import { ModulesType } from "@/validators/modules/modules-validator";
import { ErrorResponse } from "@/types/metadata/metadata";

interface UpdateModuleResponse {
  data: Modules;
}

export const UpdateModuleHandler = async (
  id: number,
  body: ModulesType,
  token: string,
): Promise<UpdateModuleResponse> => {
  const { data } = await api.put(`/modules/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateModule = (
  options?: UseMutationOptions<
    UpdateModuleResponse,
    AxiosError<ErrorResponse>,
    { id: number; body: ModulesType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      UpdateModuleHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
