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
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useDeleteMaterialContent } from "@/http/material-contents/delete-material-content";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DashboardMaterialContentDetailWrapperProps {
  contentId: number;
}

export default function DashboardMaterialContentDetailWrapper({
  contentId,
}: DashboardMaterialContentDetailWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  const { mutate: deleteContent, isPending: isDeleting } =
    useDeleteMaterialContent({
      onSuccess: () => {
        toast.success("Berhasil menghapus konten materi");
        router.push("/dashboard/admin/material-contents");
      },
      onError: () => {
        toast.error("Gagal menghapus konten materi");
      },
    });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <DashboardTitle title={data?.data.title} isPending={isPending} />
        {session?.user?.role === "admin" && (
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/admin/material-contents/${contentId}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Konten
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirm("Apakah anda yakin ingin menghapus konten materi ini?")) {
                  deleteContent({ id: contentId, token: session?.access_token as string });
                }
              }}
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Konten
            </Button>
          </div>
        )}
      </div>
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
