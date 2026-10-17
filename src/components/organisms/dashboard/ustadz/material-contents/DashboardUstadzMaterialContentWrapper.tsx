"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SearchBar from "@/components/atoms/search/Searchbar";
import { ManagedMaterialStatus, useGetManagedMaterialContents } from "@/http/material-contents/get-managed-material-contents";
import { MaterialContent, MaterialRevisionStatus } from "@/types/material-contents/material-content";
import DashboardUstadzReviewQueue from "./DashboardUstadzReviewQueue";

type View = "pending" | "all";

const statusLabels: Record<MaterialRevisionStatus | "published", string> = {
  draft: "Draft",
  pending: "Menunggu persetujuan",
  approved: "Disetujui",
  rejected: "Ditolak",
  superseded: "Digantikan",
  published: "Terbit",
};

const statusOptions = [
  "all",
  "draft",
  "pending",
  "rejected",
  "approved",
  "published",
  "superseded",
] as const satisfies readonly (ManagedMaterialStatus | "all")[];

function isStatusOption(value: string): value is (typeof statusOptions)[number] {
  return statusOptions.some((option) => option === value);
}

export default function DashboardUstadzMaterialContentWrapper() {
  const { data: session, status } = useSession();
  const [view, setView] = useState<View>("pending");
  const [filter, setFilter] = useState<ManagedMaterialStatus | "all">("all");
  const [search, setSearch] = useState("");
  const token = session?.access_token ?? "";
  const enabled = status === "authenticated";
  const scope = session?.user?.id ?? "anonymous";
  const materials = useGetManagedMaterialContents(token, filter, scope, { enabled: enabled && view === "all" });

  const filteredMaterials = useMemo(
    () => (materials.data?.data ?? []).filter((material) =>
      `${material.title ?? ""} ${material.latest_revision?.title ?? ""} ${material.sub_modul?.title ?? material.latest_revision?.sub_modul?.title ?? ""}`
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
    ),
    [materials.data?.data, search],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tampilan konten materi">
        <Button variant={view === "pending" ? "default" : "outline"} onClick={() => setView("pending")} role="tab" aria-selected={view === "pending"}>
          Menunggu persetujuan
        </Button>
        <Button variant={view === "all" ? "default" : "outline"} onClick={() => setView("all")} role="tab" aria-selected={view === "all"}>
          Semua konten
        </Button>
      </div>

      {view === "pending" ? (
        <DashboardUstadzReviewQueue />
      ) : (
        <section aria-labelledby="monitor-heading" className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="monitor-heading" className="text-xl font-semibold">Monitoring semua konten</h2>
              <p className="text-sm text-muted-foreground">Lihat status publikasi dan riwayat persetujuan setiap konten.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <SearchBar placeholder="Cari judul atau sub modul" value={search} onChange={setSearch} />
              <Select value={filter} onValueChange={(value) => { if (isStatusOption(value)) setFilter(value); }}>
                <SelectTrigger className="w-full sm:w-52" aria-label="Filter status konten">
                  <SelectValue placeholder="Semua status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Menunggu persetujuan</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="published">Terbit</SelectItem>
                  <SelectItem value="superseded">Digantikan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {materials.isPending ? <p role="status" className="text-sm text-muted-foreground">Memuat daftar konten...</p> : null}
          {materials.isError ? <p role="alert" className="text-sm text-destructive">Daftar konten belum dapat dimuat. Muat ulang halaman untuk mencoba lagi.</p> : null}
          {!materials.isPending && !materials.isError && filteredMaterials.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Tidak ada konten untuk filter ini.</CardContent></Card>
          ) : null}
          <div className="grid gap-3">
            {filteredMaterials.map((material) => <ManagedMaterialCard key={material.id} material={material} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function ManagedMaterialCard({ material }: { material: MaterialContent }) {
  const status = material.management_status ?? (material.published_at ? "published" : "draft");
  const revisionId = material.latest_revision?.status === "pending" ? material.latest_revision.id : undefined;
  return (
    <Card>
      <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <CardTitle className="break-words text-base">{material.latest_revision?.title ?? material.title ?? "Belum ada judul"}</CardTitle>
          <CardDescription>{material.sub_modul?.title ?? material.latest_revision?.sub_modul?.title ?? "Sub modul tidak tersedia"}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={status === "rejected" ? "destructive" : status === "pending" ? "secondary" : "outline"}>{statusLabels[status]}</Badge>
          {material.published_at && <Badge variant="default">Terbit</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0 sm:flex-row sm:items-center sm:justify-between">
        <p className="line-clamp-2 text-sm text-muted-foreground">{material.latest_revision?.rejection_reason ?? material.latest_revision?.article_title ?? "Detail dan riwayat tersedia di halaman konten."}</p>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href={`/dashboard/ustadz/material-contents/${material.id}${revisionId ? `?revisionId=${revisionId}` : ""}`}>Lihat detail</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
