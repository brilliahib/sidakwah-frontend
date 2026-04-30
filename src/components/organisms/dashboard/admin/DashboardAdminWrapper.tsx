"use client";

import CardDashboardSummary from "@/components/molecules/card/dashboard/CardDashboardSummary";
import { useGetDashboardSummary } from "@/http/dashboard/get-dashboard-summary";
import { useSession } from "next-auth/react";

export default function DashboardAdminWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDashboardSummary(
    session?.access_token as string,
    {
      enabled: !!session?.access_token && status === "authenticated",
    },
  );

  return (
    <section>
      <CardDashboardSummary data={data?.data} isPending={isPending} />
    </section>
  );
}
