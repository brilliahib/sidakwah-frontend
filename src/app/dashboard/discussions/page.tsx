import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardDiscussionWrapper from "@/components/organisms/dashboard/discussions/DashboardDiscussionWrapper";

export default function DashboardDiscussionPage() {
  return (
    <main>
      <DashboardTitle title="Forum Diskusi" />
      <DashboardDiscussionWrapper />
    </main>
  );
}
