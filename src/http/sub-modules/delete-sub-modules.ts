import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ErrorResponse } from "@/types/metadata/metadata";
import { SubModules } from "@/types/sub-modules/sub-modules";

interface DeleteSubModulePayload {
  id: number;
  token: string;
}

interface DeleteSubModuleResponse {
  data: SubModules;
}

export const DeleteSubModuleHandler = async ({
  id,
  token,
}: DeleteSubModulePayload): Promise<DeleteSubModuleResponse> => {
  const { data } = await api.delete(`/sub-modules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteSubModule = (
  options?: UseMutationOptions<
    DeleteSubModuleResponse,
    AxiosError<ErrorResponse>,
    DeleteSubModulePayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteSubModuleHandler,
    ...options,
  });
};
