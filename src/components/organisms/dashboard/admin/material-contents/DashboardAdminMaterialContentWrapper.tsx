"use client";

import { materialContentColumns } from "@/components/atoms/datacolumn/DataMaterialContent";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllMaterialContent } from "@/http/material-contents/get-all-material-content";
import { MaterialContent } from "@/types/material-contents/material-content";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardAdminMaterialContentWrapper() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const { data, isPending } = useGetAllMaterialContent(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const filteredData = (data?.data ?? []).filter((item: MaterialContent) =>
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
            href="/dashboard/admin/material-contents/create"
            className="flex items-center gap-2"
          >
            <Plus /> Tambah Konten Materi
          </Link>
        </Button>
      </div>
      <DataTable
        data={filteredData}
        columns={materialContentColumns}
        isLoading={isPending}
      />
    </div>
  );
}
