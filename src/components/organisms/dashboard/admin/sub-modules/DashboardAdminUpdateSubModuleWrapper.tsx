"use client";

import FormUpdateSubModules from "@/components/molecules/form/sub-modules/FormUpdateSubModules";
import { useGetDetailSubModule } from "@/http/sub-modules/get-detail-sub-modules";
import { useSession } from "next-auth/react";

interface DashboardAdminUpdateSubModuleWrapperProps {
  id: number;
}

export default function DashboardAdminUpdateSubModuleWrapper({
  id,
}: DashboardAdminUpdateSubModuleWrapperProps) {
  const { data: session, status } = useSession();

  const { data } = useGetDetailSubModule(id, session?.access_token as string, {
    enabled: !!session?.access_token && status === "authenticated",
  });
  return (
    <section>
      <FormUpdateSubModules data={data?.data} id={id} />
    </section>
  );
}
