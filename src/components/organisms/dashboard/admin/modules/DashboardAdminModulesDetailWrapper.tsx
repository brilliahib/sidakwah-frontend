"use client";

import AlertDialogDeleteSubModule from "@/components/atoms/alert-dialog/sub-modules/AlertDialogDeleteSubModule";
import { subModulesColumns } from "@/components/atoms/datacolumn/DataSubModules";
import SearchBar from "@/components/atoms/search/Searchbar";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetDetailModules } from "@/http/modules/get-detail-modules";
import { useDeleteSubModule } from "@/http/sub-modules/delete-sub-modules";
import { useGetAllSubModulesByModules } from "@/http/sub-modules/get-sub-modules-by-modules";
import { SubModules } from "@/types/sub-modules/sub-modules";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface DashboardAdminModulesDetailWrapperProps {
  id: number;
}

export default function DashboardAdminModulesDetailWrapper({
  id,
}: DashboardAdminModulesDetailWrapperProps) {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const [isSelectedDeleteSubModules, setIsSelectedDeleteSubModules] =
    useState<SubModules | null>(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const deleteSubModuleHandler = (data: SubModules) => {
    setIsSelectedDeleteSubModules(data);
    setIsDialogDeleteOpen(true);
  };

  const queryClient = useQueryClient();

  const { data, isPending } = useGetDetailModules(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: subModules, isPending: isSubModulesPending } =
    useGetAllSubModulesByModules(id, session?.access_token as string, {
      enabled: status === "authenticated",
    });

  const filteredData = (subModules?.data ?? []).filter((item: SubModules) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const { mutate: deleteSubModule } = useDeleteSubModule({
    onError: (error) => {
      toast.error("Gagal menghapus sub modul!", {
        description: error.response?.data.meta.message ?? "Terjadi kesalahan.",
      });
    },
    onSuccess: () => {
      setIsSelectedDeleteSubModules(null);
      toast.success("Berhasil menghapus sub modul!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-sub-modules"],
      });
    },
  });

  const handleDeleteModule = () => {
    if (isSelectedDeleteSubModules) {
      deleteSubModule({
        id: isSelectedDeleteSubModules.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <div>
      <DashboardTitle title={data?.data.title} isPending={isPending} />
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
          <SearchBar
            placeholder="Cari sub modul..."
            value={searchInput}
            onChange={setSearchInput}
          />
          <Button asChild>
            <Link
              href="/dashboard/admin/sub-modules/create"
              className="flex items-center gap-2"
            >
              <Plus /> Tambah Sub Modul
            </Link>
          </Button>
        </div>
        <DataTable
          columns={subModulesColumns({ deleteSubModuleHandler })}
          data={filteredData}
          isLoading={isSubModulesPending}
        />

        {isSelectedDeleteSubModules && (
          <AlertDialogDeleteSubModule
            open={isDialogDeleteOpen}
            setOpen={setIsDialogDeleteOpen}
            confirmDelete={handleDeleteModule}
          />
        )}
      </div>
    </div>
  );
}
