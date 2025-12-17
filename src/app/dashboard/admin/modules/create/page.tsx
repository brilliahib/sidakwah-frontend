import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCreateModulesWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminCreateModulesWrapper";

export default function DashboardAdminCreateModulePage() {
  return (
    <section>
      <DashboardTitle title="Tambah Modul Baru" />
      <DashboardAdminCreateModulesWrapper />
    </section>
  );
}
