"use client";

import SearchBar from "@/components/atoms/search/Searchbar";
import CardListModules from "@/components/molecules/card/modules/CardListModules";
import { useGetAllModules } from "@/http/modules/get-all-modules";
import { Modules } from "@/types/modules/modules";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardModulesWrapper() {
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
    <div className="space-y-8">
      <SearchBar
        placeholder="Cari modul..."
        value={searchInput}
        onChange={setSearchInput}
      />
      <CardListModules data={filteredData} isPending={isPending} />
    </div>
  );
}
