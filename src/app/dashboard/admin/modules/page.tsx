import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminModulesWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminModulesWrapper";

export default function DashboardAdminModulesPage() {
  return (
    <section>
      <DashboardTitle title="Modul" />
      <DashboardAdminModulesWrapper />
    </section>
  );
}
