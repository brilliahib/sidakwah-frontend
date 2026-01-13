import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminUserDetailWrapper from "@/components/organisms/dashboard/admin/users/DashboardAdminUserDetailWrapper";

interface DashboardAdminUserDetailPageProps {
  params: Promise<{ id: number }>;
}

export default async function DashboardAdminUserDetailPage({
  params,
}: DashboardAdminUserDetailPageProps) {
  const { id } = await params;

  return (
    <main>
      <DashboardTitle title="Detail Pengguna" />
      <DashboardAdminUserDetailWrapper id={id} />
    </main>
  );
}
