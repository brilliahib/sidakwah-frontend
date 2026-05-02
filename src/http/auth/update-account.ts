import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse } from "@/types/metadata/metadata";
import { User } from "@/types/user/user";
import { UpdateAccountType } from "@/validators/auth/update-account-validator";

interface UpdateAccountResponse {
  data: User;
}

export const UpdateAccountHandler = async (
  body: UpdateAccountType,
  token: string,
): Promise<UpdateAccountResponse> => {
  const { data } = await api.put(`/auth/update-account`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateAccount = (
  options?: UseMutationOptions<
    UpdateAccountResponse,
    AxiosError<ErrorResponse>,
    { body: UpdateAccountType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ body }) =>
      UpdateAccountHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
