import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { SubModulesType } from "@/validators/sub-modules/sub-modules-validator";

export const createSubModulesHandler = async (
  body: SubModulesType,
  token: string
) => {
  const { data } = await api.post("/sub-modules", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateSubModules = (
  options?: UseMutationOptions<unknown, AxiosError, SubModulesType>
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      createSubModulesHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
