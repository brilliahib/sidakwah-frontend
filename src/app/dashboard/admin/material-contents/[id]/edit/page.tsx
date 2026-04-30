import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminUpdateMaterialContentWrapper from "@/components/organisms/dashboard/admin/material-contents/DashboardAdminUpdateMaterialContentWrapper";

interface DashboardAdminEditMaterialContentPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function DashboardAdminEditMaterialContentPage({
  params,
}: DashboardAdminEditMaterialContentPageProps) {
  const { id } = await params;

  return (
    <main>
      <DashboardTitle title="Edit Konten Materi" />
      <DashboardAdminUpdateMaterialContentWrapper id={id} />
    </main>
  );
}
