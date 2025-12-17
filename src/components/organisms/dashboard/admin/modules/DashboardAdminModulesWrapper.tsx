"use client";

import { modulesColumns } from "@/components/atoms/datacolumn/DataModules";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllModules } from "@/http/modules/get-all-modules";
import { Modules } from "@/types/modules/modules";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardAdminModulesWrapper() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const { data, isPending } = useGetAllModules(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const filteredData = (data?.data ?? []).filter((item: Modules) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

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
        columns={modulesColumns}
        isLoading={isPending}
      />
    </div>
  );
}
