"use client";

import AlertDialogDeleteModule from "@/components/atoms/alert-dialog/modules/AlertDialogDeleteModule";
import { modulesColumns } from "@/components/atoms/datacolumn/DataModules";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteModule } from "@/http/modules/delete-module";
import { useGetAllModules } from "@/http/modules/get-all-modules";
import { Modules } from "@/types/modules/modules";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminModulesWrapper() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const [isSelectedDeleteModules, setIsSelectedDeleteModules] =
    useState<Modules | null>(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isPending } = useGetAllModules(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const deleteModuleHandler = (data: Modules) => {
    setIsSelectedDeleteModules(data);
    setIsDialogDeleteOpen(true);
  };

  const filteredData = (data?.data ?? []).filter((item: Modules) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const { mutate: deleteModule } = useDeleteModule({
    onError: (error) => {
      toast.error("Gagal menghapus modul!", {
        description: error.response?.data.meta.message ?? "Terjadi kesalahan.",
      });
    },
    onSuccess: () => {
      setIsSelectedDeleteModules(null);
      toast.success("Berhasil menghapus modul!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-modules"],
      });
    },
  });

  const handleDeleteModule = () => {
    if (isSelectedDeleteModules) {
      deleteModule({
        id: isSelectedDeleteModules.id,
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
            href="/dashboard/admin/modules/create"
            className="flex items-center gap-2"
          >
            <Plus /> Tambah Modul
          </Link>
        </Button>
      </div>
      <DataTable
        data={filteredData}
        columns={modulesColumns({ deleteModuleHandler })}
        isLoading={isPending}
      />

      {isSelectedDeleteModules && (
        <AlertDialogDeleteModule
          open={isDialogDeleteOpen}
          setOpen={setIsDialogDeleteOpen}
          confirmDelete={handleDeleteModule}
        />
      )}
    </div>
  );
}
