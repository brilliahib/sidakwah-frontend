"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListComment from "@/components/molecules/comment/CardListComment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllComment } from "@/http/comments/get-all-comment";
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

  const { data: comment, isPending: isCommentPending } = useGetAllComment(
    contentId,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <div>
      <DashboardTitle title={data?.data.title} isPending={isPending} />
      <div className="space-y-6">
        {isPending ? (
          <Skeleton className="aspect-video w-full rounded-lg" />
        ) : (
          data?.data.youtube_link && (
            <iframe
              src={data?.data.youtube_link}
              className="aspect-video w-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        )}
        <div>
          <Tabs defaultValue="discussion">
            <TabsList>
              <TabsTrigger value="discussion">Forum Diskusi</TabsTrigger>
              <TabsTrigger value="article">Artikel</TabsTrigger>
            </TabsList>
            <TabsContent value="discussion">
              <CardListComment
                data={comment?.data}
                materialContentId={contentId}
                isLoading={isCommentPending}
              />
            </TabsContent>
            {data?.data.article_content && (
              <TabsContent value="article">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.data.article_content,
                  }}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
