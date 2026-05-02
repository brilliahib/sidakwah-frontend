import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse } from "@/types/metadata/metadata";
import { User } from "@/types/user/user";
import { ChangePasswordType } from "@/validators/auth/change-password-validator";

interface ChangePasswordResponse {
  data: User;
}

export const ChangePasswordHandler = async (
  body: ChangePasswordType,
  token: string,
): Promise<ChangePasswordResponse> => {
  const { data } = await api.put(`/auth/change-password`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useChangePassword = (
  options?: UseMutationOptions<
    ChangePasswordResponse,
    AxiosError<ErrorResponse>,
    { body: ChangePasswordType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ body }) =>
      ChangePasswordHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
