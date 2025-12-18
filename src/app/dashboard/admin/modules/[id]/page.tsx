import DashboardAdminModulesDetailWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminModulesDetailWrapper";

interface DashboardAdminDetailModulesPageProps {
  params: Promise<{ id: number }>;
}

export default async function DashboardAdminDetailModulesPage({
  params,
}: DashboardAdminDetailModulesPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardAdminModulesDetailWrapper id={id} />
    </section>
  );
}
