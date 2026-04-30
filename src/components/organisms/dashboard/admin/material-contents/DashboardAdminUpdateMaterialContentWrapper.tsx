"use client";

import FormUpdateMaterialContent from "@/components/molecules/form/material-contents/FormUpdateMaterialContent";
import { useGetDetailMaterialContent } from "@/http/material-contents/get-detail-material-content";
import { useSession } from "next-auth/react";

interface DashboardAdminUpdateMaterialContentWrapperProps {
  id: number;
}

export default function DashboardAdminUpdateMaterialContentWrapper({
  id,
}: DashboardAdminUpdateMaterialContentWrapperProps) {
  const { data: session, status } = useSession();

  const { data } = useGetDetailMaterialContent(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <section>
      <FormUpdateMaterialContent data={data?.data} id={id} />
    </section>
  );
}
