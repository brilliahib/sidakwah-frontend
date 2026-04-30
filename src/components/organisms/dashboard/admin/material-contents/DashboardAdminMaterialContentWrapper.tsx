"use client";

import AlertDialogDeleteMaterialContent from "@/components/atoms/alert-dialog/material-contents/AlertDialogDeleteMaterialContent";
import { materialContentColumns } from "@/components/atoms/datacolumn/DataMaterialContent";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteMaterialContent } from "@/http/material-contents/delete-material-content";
import { useGetAllMaterialContent } from "@/http/material-contents/get-all-material-content";
import { MaterialContent } from "@/types/material-contents/material-content";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminMaterialContentWrapper() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const [isSelectedDeleteMaterialContent, setIsSelectedDeleteMaterialContent] =
    useState<MaterialContent | null>(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const deleteMaterialContentHandler = (data: MaterialContent) => {
    setIsSelectedDeleteMaterialContent(data);
    setIsDialogDeleteOpen(true);
  };

  const queryClient = useQueryClient();

  const { data, isPending } = useGetAllMaterialContent(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = (data?.data ?? []).filter((item: MaterialContent) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const { mutate: deleteMaterialContent } = useDeleteMaterialContent({
    onError: (error) => {
      toast.error("Gagal menghapus konten materi!", {
        description: error.response?.data.meta.message ?? "Terjadi kesalahan.",
      });
    },
    onSuccess: () => {
      setIsSelectedDeleteMaterialContent(null);
      toast.success("Berhasil menghapus konten materi!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-material-contents"],
      });
    },
  });

  const handleDeleteModule = () => {
    if (isSelectedDeleteMaterialContent) {
      deleteMaterialContent({
        id: isSelectedDeleteMaterialContent.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
        <SearchBar
          placeholder="Cari modul..."
          value={searchInput}
          onChange={setSearchInput}
        />
        <Button asChild>
          <Link
            href="/dashboard/admin/material-contents/create"
            className="flex items-center gap-2"
          >
            <Plus /> Tambah Konten Materi
          </Link>
        </Button>
      </div>
      <DataTable
        data={filteredData}
        columns={materialContentColumns({ deleteMaterialContentHandler })}
        isLoading={isPending}
      />

      {isSelectedDeleteMaterialContent && (
        <AlertDialogDeleteMaterialContent
          open={isDialogDeleteOpen}
          setOpen={setIsDialogDeleteOpen}
          confirmDelete={handleDeleteModule}
        />
      )}
    </div>
  );
}
