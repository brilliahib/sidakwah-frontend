import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse } from "@/types/metadata/metadata";
import { SubModules } from "@/types/sub-modules/sub-modules";
import { SubModulesType } from "@/validators/sub-modules/sub-modules-validator";

interface UpdateSubModuleResponse {
  data: SubModules;
}

export const UpdateSubModuleHandler = async (
  id: number,
  body: SubModulesType,
  token: string,
): Promise<UpdateSubModuleResponse> => {
  const { data } = await api.put(`/sub-modules/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateSubModule = (
  options?: UseMutationOptions<
    UpdateSubModuleResponse,
    AxiosError<ErrorResponse>,
    { id: number; body: SubModulesType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      UpdateSubModuleHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
