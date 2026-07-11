import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminDiscussionWrapper from "@/components/organisms/dashboard/admin/discussions/DashboardAdminDiscussionWrapper";

export default function DashboardAdminDiscusssionPage() {
  return (
    <section>
      <DashboardTitle title="Forum Diskusi" />
      <DashboardAdminDiscussionWrapper />
    </section>
  );
}
