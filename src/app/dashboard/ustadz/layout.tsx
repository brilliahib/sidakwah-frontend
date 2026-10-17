import { PropsWithChildren } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardUstadzLayout({
  children,
}: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "ustadz") {
    redirect(session.user.role === "admin" ? "/dashboard/admin" : "/dashboard");
  }

  return <>{children}</>;
}
