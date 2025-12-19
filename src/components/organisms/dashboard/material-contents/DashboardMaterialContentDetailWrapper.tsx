"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDetailMaterialContent } from "@/http/material-contents/get-detail-material-content";
import { useSession } from "next-auth/react";

interface DashboardMaterialContentDetailWrapperProps {
  contentId: number;
}

export default function DashboardMaterialContentDetailWrapper({
  contentId,
}: DashboardMaterialContentDetailWrapperProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetDetailMaterialContent(
    contentId,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <div>
      <DashboardTitle title={data?.data.title} isPending={isPending} />
      {data?.data.youtube_link && (
        <iframe
          src={data?.data.youtube_link}
          className="aspect-video w-full rounded-lg"
        />
      )}
      <div>
        <Tabs defaultValue="discussion">
          <TabsList>
            <TabsTrigger value="discussion">Forum Diskusi</TabsTrigger>
            <TabsTrigger value="article">Artikel</TabsTrigger>
          </TabsList>
          <TabsContent value="discussion">
            <div>belom selesai ye :P</div>
          </TabsContent>
          {data?.data.article_content && (
            <TabsContent value="article">
              <div
                dangerouslySetInnerHTML={{ __html: data?.data.article_content }}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
