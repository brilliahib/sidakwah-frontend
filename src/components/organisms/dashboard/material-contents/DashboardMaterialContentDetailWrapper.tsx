"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListComment from "@/components/molecules/comment/CardListComment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllComment } from "@/http/comments/get-all-comment";
import { useGetDetailMaterialContent } from "@/http/material-contents/get-detail-material-content";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getImagePreviewUrl } from "@/utils/get-image-preview";

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
    },
  );

  const { data: comment, isPending: isCommentPending } = useGetAllComment(
    contentId,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const articleImage = data?.data.article_images
    ? getImagePreviewUrl(data.data.article_images)
    : null;

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
              <TabsContent value="article" className="space-y-4">
                {articleImage && (
                  <div className="overflow-hidden rounded-lg border">
                    <Image
                      src={getImagePreviewUrl(articleImage) as string}
                      alt={data.data.article_title ?? "Gambar artikel"}
                      width={1200}
                      height={800}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}

                <div
                  className="
              prose prose-neutral max-w-none
              prose-p:text-[1.0625rem] prose-p:leading-[1.85] prose-p:text-black/80
              prose-a:text-black prose-a:underline prose-a:underline-offset-2
              prose-strong:text-black prose-strong:font-semibold
              prose-em:italic
              prose-blockquote:border-l prose-blockquote:border-black/[0.1] prose-blockquote:bg-black/[0.02] prose-blockquote:pl-4 prose-blockquote:italic
              prose-pre:bg-black/[0.04] prose-pre:border prose-pre:border-black/[0.08]
              prose-pre:rounded-xl prose-pre:text-[12.5px] prose-pre:text-black
            "
                  dangerouslySetInnerHTML={{
                    __html: data.data.article_content,
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
