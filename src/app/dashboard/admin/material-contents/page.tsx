import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminMaterialContentWrapper from "@/components/organisms/dashboard/admin/material-contents/DashboardAdminMaterialContentWrapper";

export default function DashboardAdminMaterialContentsPage() {
  return (
    <section>
      <DashboardTitle title="Konten Materi" />
      <DashboardAdminMaterialContentWrapper />
    </section>
  );
}
