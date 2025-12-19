import DashboardMaterialContentDetailWrapper from "@/components/organisms/dashboard/material-contents/DashboardMaterialContentDetailWrapper";

interface DashboardMaterialContentDetailPageProps {
  params: Promise<{ contentId: number }>;
}

export default async function DashboardMaterialContentDetailPage({
  params,
}: DashboardMaterialContentDetailPageProps) {
  const { contentId } = await params;
  return (
    <section>
      <DashboardMaterialContentDetailWrapper contentId={contentId} />
    </section>
  );
}
