import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardUstadzMaterialContentWrapper from "@/components/organisms/dashboard/ustadz/material-contents/DashboardUstadzMaterialContentWrapper";

export default function DashboardUstadzMaterialContentsPage() {
  return (
    <section>
      <DashboardTitle title="Konten Materi" />
      <DashboardUstadzMaterialContentWrapper />
    </section>
  );
}
