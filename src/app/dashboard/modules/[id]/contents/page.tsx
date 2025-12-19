import DashboardMaterialContentWrapper from "@/components/organisms/dashboard/material-contents/DashboardMaterialContentWrapper";

interface DashboardMaterialContentPageProps {
  params: Promise<{ id: number }>;
}

export default async function DashboardMaterialContentPage({
  params,
}: DashboardMaterialContentPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardMaterialContentWrapper id={id} />
    </section>
  );
}
