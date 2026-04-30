"use client";

import FormUpdateModules from "@/components/molecules/form/modules/FormUpdateModules";
import { useGetDetailModules } from "@/http/modules/get-detail-modules";
import { useSession } from "next-auth/react";

interface DashboardAdminEditModulesWrapperProps {
  id: number;
}

export default function DashboardAdminEditModulesWrapper({
  id,
}: DashboardAdminEditModulesWrapperProps) {
  const { data: session, status } = useSession();

  const { data } = useGetDetailModules(id, session?.access_token as string, {
    enabled: !!session?.access_token && status === "authenticated",
  });

  return (
    <section>
      <FormUpdateModules data={data?.data} id={id} />
    </section>
  );
}
