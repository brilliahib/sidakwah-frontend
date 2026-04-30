import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ErrorResponse } from "@/types/metadata/metadata";
import { Modules } from "@/types/modules/modules";

interface DeleteModulePayload {
  id: number;
  token: string;
}

interface DeleteModuleResponse {
  data: Modules;
}

export const DeleteModuleHandler = async ({
  id,
  token,
}: DeleteModulePayload): Promise<DeleteModuleResponse> => {
  const { data } = await api.delete(`/modules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteModule = (
  options?: UseMutationOptions<
    DeleteModuleResponse,
    AxiosError<ErrorResponse>,
    DeleteModulePayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteModuleHandler,
    ...options,
  });
};
