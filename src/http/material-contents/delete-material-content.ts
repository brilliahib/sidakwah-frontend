import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ErrorResponse } from "@/types/metadata/metadata";
import { Modules } from "@/types/modules/modules";

interface DeleteMaterialContentPayload {
  id: number;
  token: string;
}

interface DeleteMaterialContentResponse {
  data: Modules;
}

export const DeleteMaterialContentHandler = async ({
  id,
  token,
}: DeleteMaterialContentPayload): Promise<DeleteMaterialContentResponse> => {
  const { data } = await api.delete(`/material-contents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteMaterialContent = (
  options?: UseMutationOptions<
    DeleteMaterialContentResponse,
    AxiosError<ErrorResponse>,
    DeleteMaterialContentPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteMaterialContentHandler,
    ...options,
  });
};
