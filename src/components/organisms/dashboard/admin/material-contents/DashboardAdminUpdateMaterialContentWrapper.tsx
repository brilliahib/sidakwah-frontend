"use client";

import FormUpdateMaterialContent from "@/components/molecules/form/material-contents/FormUpdateMaterialContent";
import { useGetManagedMaterialContentDetail } from "@/http/material-contents/get-managed-material-content-detail";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DashboardAdminUpdateMaterialContentWrapperProps {
  id: number;
}

export default function DashboardAdminUpdateMaterialContentWrapper({
  id,
}: DashboardAdminUpdateMaterialContentWrapperProps) {
  const { data: session, status } = useSession();

  const { data } = useGetManagedMaterialContentDetail(
    id,
    session?.access_token ?? "",
    session?.user?.id ?? "anonymous",
    {
      enabled: status === "authenticated",
    },
  );

  const material = data?.data;
  const revision = material?.latest_revision;
  const formData = material ? {
    ...material,
    sub_modul_id: revision?.sub_modul_id ?? material.sub_modul_id ?? 0,
    title: revision?.title ?? material.title ?? "",
    youtube_link: revision?.youtube_link ?? material.youtube_link,
    article_title: revision?.article_title ?? material.article_title,
    article_content: revision?.article_content ?? material.article_content,
    article_images: revision?.article_images ?? material.article_images,
  } : undefined;

  return (
    <section className="space-y-4">
      {data?.data.latest_revision?.status === "rejected" && data.data.latest_revision.rejection_reason && (
        <Alert variant="destructive">
          <AlertTitle>Konten perlu diperbaiki</AlertTitle>
          <AlertDescription>{data.data.latest_revision.rejection_reason}</AlertDescription>
        </Alert>
      )}
      {data?.data.latest_revision?.status === "pending" && (
        <Alert>
          <AlertTitle>Menunggu persetujuan Ustadz</AlertTitle>
          <AlertDescription>Perubahan yang sedang ditinjau belum mengubah materi yang telah terbit.</AlertDescription>
        </Alert>
      )}
      <FormUpdateMaterialContent data={formData} id={id} />
    </section>
  );
}
