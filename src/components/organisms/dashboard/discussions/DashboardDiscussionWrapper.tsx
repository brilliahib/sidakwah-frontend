"use client";

import CardListComment from "@/components/molecules/card/comments/CardListComment";
import { useGetComment } from "@/http/comments/get-comment";
import { useSession } from "next-auth/react";

export default function DashboardDiscussionWrapper() {
  const { data: session, status } = useSession();
  const viewerKey = `${session?.user?.id ?? "anonymous"}:${session?.user?.role ?? ""}`;

  const { data, isPending } = useGetComment(session?.access_token as string, viewerKey, {
    enabled: status === "authenticated",
  });

  return (
    <section>
      <CardListComment
        data={data?.data}
        isPending={isPending}
        session={session!}
      />
    </section>
  );
}
