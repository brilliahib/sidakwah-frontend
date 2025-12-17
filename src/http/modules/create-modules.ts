import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ModulesType } from "@/validators/modules/modules-validator";

export const createModulesHandler = async (
  body: ModulesType,
  token: string
) => {
  const { data } = await api.post("/modules", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateModules = (
  options?: UseMutationOptions<unknown, AxiosError, ModulesType>
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      createModulesHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
