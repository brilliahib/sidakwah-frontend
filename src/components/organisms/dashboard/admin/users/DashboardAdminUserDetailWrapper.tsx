"use client";

import CardUserDetail from "@/components/molecules/card/users/CardUserDetail";
import { useGetDetailUser } from "@/http/users/get-detail-user";
import { useSession } from "next-auth/react";

interface DashboardAdminUserDetailWrapperProps {
  id: number;
}

export default function DashboardAdminUserDetailWrapper({
  id,
}: DashboardAdminUserDetailWrapperProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDetailUser(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <section>
      <CardUserDetail data={data?.data} />
    </section>
  );
}
