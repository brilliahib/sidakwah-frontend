import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardSettingWrapper from "@/components/organisms/dashboard/settings/DashboardSettingWrapper";

export default function DashboardSettingPage() {
  return (
    <main>
      <DashboardTitle title="Pengaturan Akun" />
      <DashboardSettingWrapper />
    </main>
  );
}
