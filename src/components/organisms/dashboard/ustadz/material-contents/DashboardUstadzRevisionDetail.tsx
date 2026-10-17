"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetManagedMaterialContentDetail } from "@/http/material-contents/get-managed-material-content-detail";
import { getMaterialContentRevisionImage } from "@/http/material-contents/get-material-content-revisions";
import { MaterialContentRevision } from "@/types/material-contents/material-content-revision";
import ReviewDecisionControls from "./ReviewDecisionControls";
import { getImagePreviewUrl } from "@/utils/get-image-preview";

interface DashboardUstadzRevisionDetailProps {
  materialId: number;
  revisionId?: number;
}

const statusText: Record<MaterialContentRevision["status"], string> = {
  draft: "Draft",
  pending: "Menunggu persetujuan",
  approved: "Disetujui",
  rejected: "Ditolak",
  superseded: "Digantikan",
};

export default function DashboardUstadzRevisionDetail({ materialId, revisionId }: DashboardUstadzRevisionDetailProps) {
  const { data: session, status } = useSession();
  const token = session?.access_token ?? "";
  const { data, isPending, isError } = useGetManagedMaterialContentDetail(
    materialId,
    token,
    session?.user?.id ?? "anonymous",
    { enabled: status === "authenticated" },
  );
  const revisions = data?.data.revisions ?? [];
  const selectedRevision = revisions.find((revision) => revision.id === revisionId)
    ?? revisions.find((revision) => revision.status === "pending")
    ?? revisions[0];
  const [loadedImage, setLoadedImage] = useState<{ revisionId: number; url: string } | null>(null);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;
    if (!selectedRevision?.article_images || !token) {
      return;
    }
    void getMaterialContentRevisionImage(selectedRevision.id, token).then((blob) => {
      if (!active) return;
      objectUrl = URL.createObjectURL(blob);
      setLoadedImage({ revisionId: selectedRevision.id, url: objectUrl });
    }).catch(() => {
      if (active) setLoadedImage(null);
    });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [selectedRevision?.id, selectedRevision?.article_images, token]);

  if (isPending) return <Skeleton className="h-64 w-full" />;
  if (isError || !data?.data) return <p role="alert" className="text-sm text-destructive">Detail konten tidak dapat dimuat.</p>;
  if (!selectedRevision) {
    if (!data.data.published_at) {
      return <p className="rounded-lg border p-6 text-sm text-muted-foreground">Belum ada revisi untuk konten ini.</p>;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>{data.data.title ?? "Konten materi"}</CardTitle>
          <p className="text-sm text-muted-foreground">Versi terbit · {data.data.sub_modul?.title ?? "Sub modul"}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.data.youtube_link ? <iframe title={`Video ${data.data.title ?? "materi"}`} src={data.data.youtube_link} className="aspect-video w-full rounded-lg" allowFullScreen /> : null}
          {data.data.article_images ? <Image src={getImagePreviewUrl(data.data.article_images) ?? ""} alt={data.data.article_title ?? "Gambar artikel"} width={1200} height={800} className="h-auto max-h-[28rem] w-full rounded-lg border object-contain" /> : null}
          {data.data.article_title ? <h3 className="text-lg font-semibold">{data.data.article_title}</h3> : null}
          {data.data.article_content ? <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: data.data.article_content }} /> : <p className="text-sm text-muted-foreground">Tidak ada isi artikel.</p>}
          <Button variant="outline" asChild><Link href="/dashboard/ustadz/material-contents">Kembali ke daftar</Link></Button>
        </CardContent>
      </Card>
    );
  }

  const isPendingRevision = selectedRevision.status === "pending";
  const imageUrl = loadedImage?.revisionId === selectedRevision.id ? loadedImage.url : null;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="break-words text-2xl font-semibold">{selectedRevision.title}</h2>
          <p className="text-sm text-muted-foreground">Versi {selectedRevision.version} · {selectedRevision.sub_modul?.title ?? data.data.sub_modul?.title ?? "Sub modul"}</p>
        </div>
        <Badge variant={selectedRevision.status === "rejected" ? "destructive" : isPendingRevision ? "secondary" : "outline"}>{statusText[selectedRevision.status]}</Badge>
      </div>

      {data.data.published_at ? (
        <Card>
          <CardHeader><CardTitle className="text-base">Versi yang sedang terbit</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">{data.data.title}</p>
            <p className="text-muted-foreground">{data.data.article_title ?? "Tidak ada artikel"}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader><CardTitle className="text-base">Konten versi yang ditinjau</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {selectedRevision.youtube_link ? <iframe title={`Video ${selectedRevision.title}`} src={selectedRevision.youtube_link} className="aspect-video w-full rounded-lg" allowFullScreen /> : null}
          {imageUrl ? <Image src={imageUrl} alt={selectedRevision.article_title ?? "Gambar artikel"} width={1200} height={800} unoptimized className="h-auto max-h-[28rem] w-full rounded-lg border object-contain" /> : selectedRevision.article_images ? <p className="text-sm text-muted-foreground">Pratinjau gambar tidak tersedia.</p> : null}
          {selectedRevision.article_title ? <h3 className="text-lg font-semibold">{selectedRevision.article_title}</h3> : null}
          {selectedRevision.article_content ? <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: selectedRevision.article_content }} /> : <p className="text-sm text-muted-foreground">Tidak ada isi artikel.</p>}
          {selectedRevision.rejection_reason ? <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">Alasan sebelumnya: {selectedRevision.rejection_reason}</p> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Riwayat revisi</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {revisions.map((revision) => (
            <div key={revision.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-3 text-sm">
              <span>Versi {revision.version} · {revision.title}</span>
              <Badge variant={revision.status === "rejected" ? "destructive" : revision.status === "pending" ? "secondary" : "outline"}>{statusText[revision.status]}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {isPendingRevision ? <ReviewDecisionControls revisionId={selectedRevision.id} materialId={materialId} /> : null}
      <Button variant="outline" asChild><Link href="/dashboard/ustadz/material-contents">Kembali ke daftar</Link></Button>
    </div>
  );
}
