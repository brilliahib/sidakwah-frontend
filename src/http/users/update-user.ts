import { api } from "@/lib/axios";
import type { User, UserRole } from "@/types/user/user";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UpdateUserPayload {
  readonly id: number;
  readonly token: string;
  readonly role: UserRole;
}

interface UpdateUserResponse {
  readonly data: User;
}

export const UpdateUserHandler = async ({
  id,
  token,
  role,
}: UpdateUserPayload): Promise<UpdateUserResponse> => {
  const { data } = await api.put<UpdateUserResponse>(
    `/users/${id}`,
    { role },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return data;
};

export const useUpdateUser = (
  options?: UseMutationOptions<
    UpdateUserResponse,
    AxiosError<{ message?: string }>,
    UpdateUserPayload
  >,
) => {
  return useMutation({ mutationFn: UpdateUserHandler, ...options });
};
