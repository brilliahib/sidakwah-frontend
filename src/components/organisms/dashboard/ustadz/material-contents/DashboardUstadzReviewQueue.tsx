"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPendingMaterialContentRevisions } from "@/http/material-contents/get-material-content-revisions";

export default function DashboardUstadzReviewQueue() {
  const { data: session, status } = useSession();
  const pending = useGetPendingMaterialContentRevisions(
    session?.access_token ?? "",
    session?.user?.id ?? "anonymous",
    {
    enabled: status === "authenticated",
    },
  );

  return (
    <section aria-labelledby="pending-heading" className="space-y-4">
      <div>
        <h2 id="pending-heading" className="text-xl font-semibold">Antrean persetujuan</h2>
        <p className="text-sm text-muted-foreground">Periksa versi yang dikirim admin sebelum menyetujuinya atau menolaknya.</p>
      </div>
      {pending.isPending ? <p role="status" className="text-sm text-muted-foreground">Memuat antrean...</p> : null}
      {pending.isError ? <p role="alert" className="text-sm text-destructive">Antrean belum dapat dimuat. Muat ulang halaman untuk mencoba lagi.</p> : null}
      {!pending.isPending && !pending.isError && pending.data?.data.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Tidak ada konten yang menunggu persetujuan.</CardContent></Card>
      ) : null}
      <div className="grid gap-3">
        {pending.data?.data.map((revision) => (
          <Card key={revision.id}>
            <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1">
                <CardTitle className="break-words text-base">{revision.title}</CardTitle>
                <CardDescription>
                  {revision.sub_modul?.title ?? revision.material_content?.sub_modul?.title ?? "Sub modul"} · Versi {revision.version}
                  {revision.submitter?.name ? ` · Dikirim oleh ${revision.submitter.name}` : ""}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="w-fit">Menunggu persetujuan</Badge>
            </CardHeader>
            <CardContent className="flex justify-end pt-0">
              <Button asChild size="sm">
                <Link href={`/dashboard/ustadz/material-contents/${revision.material_content_id}?revisionId=${revision.id}`}>Tinjau konten</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
