import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminUpdateSubModuleWrapper from "@/components/organisms/dashboard/admin/sub-modules/DashboardAdminUpdateSubModuleWrapper";

interface DashboardAdminEditPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function DashboardAdminEditSubModulesPage({
  params,
}: DashboardAdminEditPageProps) {
  const { id } = await params;

  return (
    <main>
      <DashboardTitle title="Edit Sub Modul" />
      <DashboardAdminUpdateSubModuleWrapper id={id} />
    </main>
  );
}
