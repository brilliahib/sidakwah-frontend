import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardUstadzMaterialContentDetailWrapper from "@/components/organisms/dashboard/ustadz/material-contents/DashboardUstadzMaterialContentDetailWrapper";

interface DashboardUstadzMaterialContentDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ revisionId?: string }>;
}

export default async function DashboardUstadzMaterialContentDetailPage({ params, searchParams }: DashboardUstadzMaterialContentDetailPageProps) {
  const [{ id }, { revisionId }] = await Promise.all([params, searchParams]);
  return (
    <section>
      <DashboardTitle title="Detail Konten Materi" />
      <DashboardUstadzMaterialContentDetailWrapper id={Number(id)} revisionId={revisionId ? Number(revisionId) : undefined} />
    </section>
  );
}
