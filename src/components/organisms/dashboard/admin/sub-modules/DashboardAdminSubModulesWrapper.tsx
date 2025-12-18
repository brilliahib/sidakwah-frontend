"use client";

import { subModulesColumns } from "@/components/atoms/datacolumn/DataSubModules";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllSubModules } from "@/http/sub-modules/get-all-sub-modules";
import { SubModules } from "@/types/sub-modules/sub-modules";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardAdminSubModulesWrapper() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const { data, isPending } = useGetAllSubModules(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const filteredData = (data?.data ?? []).filter((item: SubModules) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
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
        data={filteredData}
        isLoading={isPending}
        columns={subModulesColumns}
      />
    </div>
  );
}
