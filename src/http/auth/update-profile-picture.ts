import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse } from "@/types/metadata/metadata";

export const UpdateProfilePictureHandler = async (
  body: FormData,
  token: string,
) => {
  const formData = new FormData();

  formData.append("_method", "PUT");

  const file = body.get("profile_picture");

  if (file instanceof File) {
    formData.append("profile_picture", file, file.name);
  }

  const { data } = await api.post("/auth/update-profile-picture", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useChangeProfilePicture = (
  options?: UseMutationOptions<
    unknown,
    AxiosError<ErrorResponse>,
    { body: FormData }
  >,
) => {
  const { data: sessionData } = useSession();

  return useMutation({
    mutationFn: (params: { body: FormData }) =>
      UpdateProfilePictureHandler(
        params.body,
        sessionData?.access_token as string,
      ),
    ...options,
  });
};
