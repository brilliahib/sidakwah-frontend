import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardUserWrapper from "@/components/organisms/dashboard/admin/users/DashboardUserWrapper";

export default function DashboardAdminUsersPage() {
  return (
    <main>
      <DashboardTitle title="Manajemen Pengguna" />
      <DashboardUserWrapper />
    </main>
  );
}
