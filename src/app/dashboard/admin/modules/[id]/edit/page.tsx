import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminEditModulesWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminEditModulesWrapper";

interface DashboardAdminEditPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function DashboardAdminEditPage({
  params,
}: DashboardAdminEditPageProps) {
  const { id } = await params;

  return (
    <main>
      <DashboardTitle title="Edit Modul" />
      <DashboardAdminEditModulesWrapper id={id} />
    </main>
  );
}
