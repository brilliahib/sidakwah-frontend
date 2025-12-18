"use client";

import { subModulesColumns } from "@/components/atoms/datacolumn/DataSubModules";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetDetailModules } from "@/http/modules/get-detail-modules";
import { useGetAllSubModulesByModules } from "@/http/sub-modules/get-sub-modules-by-modules";
import { useSession } from "next-auth/react";

interface DashboardAdminModulesDetailWrapperProps {
  id: number;
}

export default function DashboardAdminModulesDetailWrapper({
  id,
}: DashboardAdminModulesDetailWrapperProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDetailModules(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const { data: subModules, isPending: isSubModulesPending } =
    useGetAllSubModulesByModules(id, session?.access_token as string, {
      enabled: status === "authenticated",
    });

  return (
    <div>
      <DashboardTitle title={data?.data.title} isPending={isPending} />
      <DataTable
        columns={subModulesColumns}
        data={subModules?.data ?? []}
        isLoading={isSubModulesPending}
      />
    </div>
  );
}
