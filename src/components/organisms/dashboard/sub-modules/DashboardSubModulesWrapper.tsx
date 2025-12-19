"use client";

import SearchBar from "@/components/atoms/search/Searchbar";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListSubModules from "@/components/molecules/card/sub-modules/CardListSubModules";
import { useGetDetailModules } from "@/http/modules/get-detail-modules";
import { useGetAllSubModulesByModules } from "@/http/sub-modules/get-sub-modules-by-modules";
import { Modules } from "@/types/modules/modules";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DashboardSubModulesWrapperProps {
  id: number;
}

export default function DashboardSubModulesWrapper({
  id,
}: DashboardSubModulesWrapperProps) {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const { data, isPending } = useGetAllSubModulesByModules(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const { data: module, isPending: isModulePending } = useGetDetailModules(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const filteredData = (data?.data ?? []).filter((item: Modules) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <DashboardTitle title={module?.data.title} isPending={isModulePending} />
      <div className="space-y-8">
        <SearchBar
          placeholder="Cari sub modul..."
          value={searchInput}
          onChange={setSearchInput}
        />
        <CardListSubModules data={filteredData} isPending={isPending} />
      </div>
    </div>
  );
}
