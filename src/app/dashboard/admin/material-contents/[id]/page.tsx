import DashboardMaterialContentDetailWrapper from "@/components/organisms/dashboard/material-contents/DashboardMaterialContentDetailWrapper";

interface DashboardAdminDetailMaterialContentPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function DashboardAdminDetailMaterialContentPage({
  params,
}: DashboardAdminDetailMaterialContentPageProps) {
  const { id } = await params;

  return (
    <main>
      <DashboardMaterialContentDetailWrapper contentId={id} />
    </main>
  );
}
