import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface DeleteuserPayload {
  id: number;
  token: string;
}

interface DeleteuserResponse {
  data: User;
}

export const DeleteuserHandler = async ({
  id,
  token,
}: DeleteuserPayload): Promise<DeleteuserResponse> => {
  const { data } = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteuser = (
  options?: UseMutationOptions<
    DeleteuserResponse,
    AxiosError<unknown>,
    DeleteuserPayload
  >
) => {
  return useMutation({
    mutationFn: DeleteuserHandler,
    ...options,
  });
};
