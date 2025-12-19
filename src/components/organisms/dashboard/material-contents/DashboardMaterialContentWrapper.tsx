"use client";

import SearchBar from "@/components/atoms/search/Searchbar";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListMaterialContent from "@/components/molecules/card/material-contents/CardListMaterialContent";
import { useGetMaterialContentBySubModule } from "@/http/material-contents/get-material-content-by-sub-module";
import { useGetDetailSubModule } from "@/http/sub-modules/get-detail-sub-modules";
import { MaterialContent } from "@/types/material-contents/material-content";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DashboardMaterialContentWrapperProps {
  id: number;
}

export default function DashboardMaterialContentWrapper({
  id,
}: DashboardMaterialContentWrapperProps) {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const { data, isPending } = useGetMaterialContentBySubModule(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const { data: subModule, isPending: isSubModulePending } =
    useGetDetailSubModule(id, session?.access_token as string, {
      enabled: status === "authenticated",
    });

  const filteredData = (data?.data ?? []).filter((item: MaterialContent) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <DashboardTitle
        title={subModule?.data.title}
        isPending={isSubModulePending}
      />
      <div className="space-y-8">
        <SearchBar
          placeholder="Cari materi..."
          value={searchInput}
          onChange={setSearchInput}
        />
        <CardListMaterialContent data={filteredData} isPending={isPending} />
      </div>
    </div>
  );
}
