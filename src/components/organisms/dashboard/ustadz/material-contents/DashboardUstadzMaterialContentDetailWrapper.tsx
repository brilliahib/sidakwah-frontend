"use client";

import { useGetManagedMaterialContentDetail } from "@/http/material-contents/get-managed-material-content-detail";
import { useSession } from "next-auth/react";
import DashboardUstadzRevisionDetail from "./DashboardUstadzRevisionDetail";

interface DashboardUstadzMaterialContentDetailWrapperProps {
  id: number;
  revisionId?: number;
}

export default function DashboardUstadzMaterialContentDetailWrapper({ id, revisionId }: DashboardUstadzMaterialContentDetailWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending, isError } = useGetManagedMaterialContentDetail(
    id,
    session?.access_token ?? "",
    session?.user?.id ?? "anonymous",
    { enabled: status === "authenticated" },
  );

  if (isPending) return <p role="status" className="text-sm text-muted-foreground">Memuat detail konten...</p>;
  if (isError || !data?.data) return <p role="alert" className="text-sm text-destructive">Detail konten tidak dapat dimuat.</p>;

  return <DashboardUstadzRevisionDetail materialId={id} revisionId={revisionId} />;
}
