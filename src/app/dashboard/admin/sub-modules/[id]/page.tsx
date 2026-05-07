import DashboardAdminDetailSubModulesWrapper from "@/components/organisms/dashboard/admin/sub-modules/DashboardAdminSubModuleDetailWrapper";

interface DashboardAdminDetailSubModulesPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function DashboardAdminDetailSubModulesPage({
  params,
}: DashboardAdminDetailSubModulesPageProps) {
  const { id } = await params;

  return (
    <main>
      <DashboardAdminDetailSubModulesWrapper id={id} />
    </main>
  );
}
