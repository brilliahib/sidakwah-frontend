import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminSubModulesWrapper from "@/components/organisms/dashboard/admin/sub-modules/DashboardAdminSubModulesWrapper";

export default function DashboardAdminSubModulesPage() {
  return (
    <section>
      <DashboardTitle title="Sub Modul" />
      <DashboardAdminSubModulesWrapper />
    </section>
  );
}
