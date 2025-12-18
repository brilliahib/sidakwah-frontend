import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCreateSubModulesWrapper from "@/components/organisms/dashboard/admin/sub-modules/DashboardAdminCreateSubModulesWrapper";

export default function DashboardAdminCreateSubModulesPage() {
  return (
    <section>
      <DashboardTitle title="Tambah Sub Modul" />
      <DashboardAdminCreateSubModulesWrapper />
    </section>
  );
}
