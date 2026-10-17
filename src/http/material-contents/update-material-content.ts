import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { MaterialContentType } from "@/validators/material-contents/material-content-validator";
import { ErrorResponse } from "@/types/metadata/metadata";
import { MaterialSubmissionAction } from "@/types/material-contents/material-content";

type UpdateMaterialContentInput = MaterialContentType & { action: MaterialSubmissionAction };

export const UpdateMaterialContentHandler = async (
  id: number,
  body: UpdateMaterialContentInput,
  token: string,
) => {
  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("sub_modul_id", String(body.sub_modul_id));
  formData.append("title", body.title);
  formData.append("action", body.action);

  if (body.youtube_link) {
    formData.append("youtube_link", body.youtube_link);
  }

  if (body.article_title) {
    formData.append("article_title", body.article_title);
  }

  if (body.article_content) {
    formData.append("article_content", body.article_content);
  }

  if (body.article_images instanceof File) {
    formData.append(
      "article_images",
      body.article_images,
      body.article_images.name,
    );
  } else if (body.article_images === null) {
    formData.append("article_images", "");
  }

  const { data } = await api.post(`/material-contents/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useUpdateMaterialContent = (
  options?: UseMutationOptions<
    unknown,
    AxiosError<ErrorResponse>,
    { id: number; body: UpdateMaterialContentInput }
  >,
) => {
  const { data: sessionData } = useSession();

  return useMutation({
    mutationFn: (params: { id: number; body: UpdateMaterialContentInput }) =>
      UpdateMaterialContentHandler(
        params.id,
        params.body,
        sessionData?.access_token as string,
      ),
    ...options,
  });
};
