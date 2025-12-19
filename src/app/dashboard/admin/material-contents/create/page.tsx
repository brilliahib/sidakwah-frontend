import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCreateMaterialContentWrapper from "@/components/organisms/dashboard/admin/material-contents/DashboardAdminCreateMaterialContentWrapper";

export default function DashboardAdminCreateMaterialContentsPage() {
  return (
    <section>
      <DashboardTitle title="Tambah Konten Materi" />
      <DashboardAdminCreateMaterialContentWrapper />
    </section>
  );
}
