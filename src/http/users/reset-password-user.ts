import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { User } from "@/types/user/user";

interface ResetPasswordResponse {
  data: User;
}

export const ResetPasswordHandler = async (
  id: number,
  token: string
): Promise<ResetPasswordResponse> => {
  const { data } = await api.post(
    `/users/${id}/reset-password`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useResetPassword = (
  options?: UseMutationOptions<
    ResetPasswordResponse,
    AxiosError<ResetPasswordResponse>,
    { id: number }
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id }) =>
      ResetPasswordHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
