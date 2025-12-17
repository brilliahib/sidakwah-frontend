import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import BreadcrumbNav from "@/components/atoms/breadcrumb/Breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarWrapper } from "@/components/organisms/sidebar/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return (
    <SidebarProvider>
      <SidebarWrapper session={session!} />
      <SidebarInset>
        <BreadcrumbNav />
        <div className="px-5 pt-20 pb-6 md:pt-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
