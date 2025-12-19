import DashboardSubModulesWrapper from "@/components/organisms/dashboard/sub-modules/DashboardSubModulesWrapper";

interface DashboardModulesPageProps {
  params: Promise<{ id: number }>;
}

export default async function DashboardModulesPage({
  params,
}: DashboardModulesPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardSubModulesWrapper id={id} />
    </section>
  );
}
