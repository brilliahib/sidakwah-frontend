"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDecideMaterialContentRevision } from "@/http/material-contents/decide-material-content-revision";
import { materialContentReviewKeys } from "@/http/material-contents/get-material-content-revisions";
import { managedMaterialKeys } from "@/http/material-contents/get-managed-material-contents";
import { toast } from "sonner";

interface ReviewDecisionControlsProps {
  revisionId: number;
  materialId: number;
}

export default function ReviewDecisionControls({ revisionId, materialId }: ReviewDecisionControlsProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useDecideMaterialContentRevision({
    onSuccess: async (_data, variables) => {
      setError(null);
      toast.success(variables.decision === "approved" ? "Konten materi berhasil diterbitkan." : "Konten materi ditolak.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: materialContentReviewKeys.all }),
        queryClient.invalidateQueries({ queryKey: managedMaterialKeys.all }),
      ]);
    },
    onError: async (mutationError) => {
      const status = mutationError.response?.status;
      const message = status === 409
        ? "Revisi ini sudah berubah atau sudah diputuskan. Data terbaru sedang dimuat."
        : mutationError.response?.data.meta.message ?? "Keputusan belum dapat disimpan.";
      setError(message);
      toast.error(message);
      if (status === 409) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: materialContentReviewKeys.all }),
          queryClient.invalidateQueries({ queryKey: managedMaterialKeys.detail(session?.user?.id ?? "anonymous", materialId) }),
        ]);
      }
    },
  });

  const reject = () => {
    const cleanReason = reason.trim();
    if (!cleanReason) {
      setError("Tuliskan alasan penolakan terlebih dahulu.");
      return;
    }
    setError(null);
    mutate({ id: revisionId, decision: "rejected", reason: cleanReason });
  };

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <h3 className="font-semibold">Keputusan Ustadz</h3>
      <p className="text-sm text-muted-foreground">Persetujuan akan menerbitkan versi yang sedang ditinjau.</p>
      <div className="space-y-2">
        <Label htmlFor="rejection-reason">Alasan penolakan</Label>
        <Textarea id="rejection-reason" value={reason} onChange={(event) => setReason(event.target.value)} maxLength={5000} rows={3} aria-invalid={Boolean(error)} />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="destructive" onClick={reject} disabled={isPending}>{isPending ? "Menyimpan..." : "Tolak dengan alasan"}</Button>
        <Button onClick={() => mutate({ id: revisionId, decision: "approved" })} disabled={isPending}>{isPending ? "Menyimpan..." : "Setujui dan terbitkan"}</Button>
      </div>
    </div>
  );
}
