import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { MaterialContentType } from "@/validators/material-contents/material-content-validator";

export const createMaterialContentHandler = async (
  body: MaterialContentType,
  token: string
) => {
  const formData = new FormData();

  formData.append("sub_modul_id", body.sub_modul_id.toString());
  formData.append("title", body.title);

  if (body.youtube_link) {
    formData.append("youtube_link", body.youtube_link);
  }

  if (body.article_title) {
    formData.append("article_title", body.article_title);
  }

  if (body.article_content) {
    formData.append("article_content", body.article_content);
  }

  if (body.article_images) {
    formData.append("article_images", body.article_images);
  }

  const { data } = await api.post(`/material-contents`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useCreateMaterialContent = (
  options?: UseMutationOptions<unknown, AxiosError, MaterialContentType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body) =>
      createMaterialContentHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
