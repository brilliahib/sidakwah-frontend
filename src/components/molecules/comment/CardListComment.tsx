import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  MessageSquare,
  MoreVertical,
  Reply,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Comment } from "@/types/comments/comment";
import {
  commentSchema,
  CommentType,
} from "@/validators/comment/comment-validator";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useCreateComment } from "@/http/comments/create-comment";
import { useQueryClient } from "@tanstack/react-query";
import { getImagePreviewUrl } from "@/utils/get-image-preview";

// Style LTR konsisten untuk semua textarea & wrapper
const LTR_STYLE: React.CSSProperties = {
  direction: "ltr",
  unicodeBidi: "isolate",
  textAlign: "left",
};

interface CardListCommentProps {
  data?: Comment[];
  materialContentId: number;
  isLoading?: boolean;
}

export default function CardListComment({
  data,
  materialContentId,
  isLoading = false,
}: CardListCommentProps) {
  const { data: session } = useSession();
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set(),
  );

  const queryClient = useQueryClient();

  const parentComments =
    data?.filter((comment) => comment.parent_id === null) || [];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - commentDate.getTime()) / 1000,
    );

    if (diffInSeconds < 60) return "baru saja";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    return commentDate.toLocaleDateString("id-ID");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleExpand = (commentId: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const mainCommentForm = useForm<CommentType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      material_content_id: Number(materialContentId),
      parent_id: null,
      content: "",
    },
  });

  const replyForm = useForm<CommentType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      material_content_id: Number(materialContentId),
      parent_id: null,
      content: "",
    },
  });

  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment({
      onSuccess: () => {
        toast.success("Komentar berhasil ditambahkan!");
        mainCommentForm.reset();
        queryClient.invalidateQueries({
          queryKey: ["get-all-comments", materialContentId],
        });
      },
      onError: (error) => {
        toast.error("Gagal menambahkan komentar");
      },
    });

  const { mutate: createReply, isPending: isCreatingReply } = useCreateComment({
    onSuccess: () => {
      toast.success("Balasan berhasil ditambahkan!");
      replyForm.reset();
      setReplyingTo(null);
      queryClient.invalidateQueries({
        queryKey: ["get-all-comments", materialContentId],
      });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan balasan");
    },
  });

  const onSubmitMainComment = (values: CommentType) => {
    createComment({
      ...values,
      material_content_id: Number(materialContentId),
      parent_id: null,
    });
  };

  const onSubmitReply = (values: CommentType) => {
    createReply({
      ...values,
      material_content_id: Number(materialContentId),
      parent_id: Number(replyingTo),
    });
  };

  const countTotalReplies = (comment: Comment): number => {
    if (!comment.replies || comment.replies.length === 0) return 0;
    return comment.replies.reduce(
      (total, reply) => total + 1 + countTotalReplies(reply),
      0,
    );
  };

  const CommentSkeleton = ({ depth = 0 }: { depth?: number }) => (
    <div className={`${depth > 0 ? "ml-8 mt-4" : ""}`}>
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-16 w-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  );

  const CommentItem = ({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedComments.has(comment.id);
    const isCurrentlyReplying = replyingTo === comment.id;
    const totalReplies = countTotalReplies(comment);

    const startReply = () => {
      handleReply(comment.id);
      replyForm.setValue("parent_id", comment.id);
    };

    const getDepthStyles = () => {
      if (depth === 0) return "border-l-0";
      return `border-l-2 pl-4`;
    };

    const isOwner =
      session?.user?.id !== undefined &&
      String(session.user.id) === String(comment.user.id);

    return (
      <div className={`${depth > 0 ? "ml-8 mt-4" : ""}`}>
        <div className={`flex gap-3 group ${getDepthStyles()}`}>
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage
              src={getImagePreviewUrl(comment.user.profile_picture) || ""}
            />
            <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {comment.user.name}
              </span>

              {isOwner && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                  Anda
                </span>
              )}

              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimeAgo(comment.created_at)}
              </span>
            </div>

            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3 whitespace-pre-wrap">
              {comment.content}
            </p>

            <div className="flex items-center gap-1 flex-wrap">
              <Button variant="ghost" size="sm" onClick={startReply}>
                <Reply className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Balas</span>
              </Button>

              {hasReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(comment.id)}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-xs font-medium">
                    {isExpanded ? "Sembunyikan" : "Tampilkan"} {totalReplies}{" "}
                    balasan
                  </span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {isCurrentlyReplying && (
              <div
                className="mt-4 bg-background rounded-lg p-4 border"
                dir="ltr"
                style={LTR_STYLE}
              >
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage
                      src={session?.user?.profile_picture || undefined}
                    />
                    <AvatarFallback>
                      {session?.user?.name
                        ? getInitials(session.user.name)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1" dir="ltr" style={LTR_STYLE}>
                    <Form {...replyForm}>
                      <form
                        onSubmit={replyForm.handleSubmit(onSubmitReply)}
                        className="space-y-3"
                        dir="ltr"
                        style={LTR_STYLE}
                      >
                        <FormField
                          control={replyForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  value={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  placeholder={`Balas ke ${comment.user.name}...`}
                                  className="min-h-[100px] text-sm resize-none bg-white dark:bg-gray-950 shadow-sm text-left"
                                  autoFocus
                                  disabled={isCreatingReply}
                                  dir="ltr"
                                  style={LTR_STYLE}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            size="sm"
                            disabled={
                              isCreatingReply ||
                              !replyForm.watch("content").trim()
                            }
                          >
                            {isCreatingReply ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Mengirim...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Balas
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleCancelReply}
                            disabled={isCreatingReply}
                          >
                            Batal
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            )}

            {hasReplies && isExpanded && (
              <div className="mt-4 space-y-4">
                {comment.replies?.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    // Paksa seluruh component LTR dari root agar tidak dipengaruhi RTL dari parent manapun
    <div className="space-y-6 mt-6" dir="ltr" style={LTR_STYLE}>
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
        <div className="p-2 rounded-lg bg-primary">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Diskusi
          </h3>
          {isLoading ? (
            <Skeleton className="h-4 w-24 mt-1" />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data?.length || 0} komentar
            </p>
          )}
        </div>
      </div>

      {/* Main Comment Form */}
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={session?.user?.profile_picture || undefined} />
          <AvatarFallback>
            {session?.user?.name ? getInitials(session.user.name) : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Form {...mainCommentForm}>
            <form
              onSubmit={mainCommentForm.handleSubmit(onSubmitMainComment)}
              className="space-y-4"
              dir="ltr"
              style={LTR_STYLE}
            >
              <FormField
                control={mainCommentForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        placeholder="Tulis komentar Anda di sini..."
                        className="min-h-[120px] text-sm resize-none bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 shadow-sm rounded-xl"
                        disabled={isCreatingComment}
                        dir="ltr"
                        style={LTR_STYLE}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    isCreatingComment ||
                    !mainCommentForm.watch("content").trim()
                  }
                >
                  {isCreatingComment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Komentar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Comments List */}
      {isLoading ? (
        <Card className="p-6 rounded-xl shadow-sm">
          <div className="space-y-6">
            <CommentSkeleton />
            <div className="border-b-2 border-gray-100 dark:border-gray-800" />
            <CommentSkeleton />
            <div className="border-b-2 border-gray-100 dark:border-gray-800" />
            <CommentSkeleton />
          </div>
        </Card>
      ) : !data || data.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2">
            Belum ada komentar
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Jadilah yang pertama memulai diskusi!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {parentComments.map((comment, index) => (
            <div key={comment.id}>
              <CommentItem comment={comment} />
              {index < parentComments.length - 1 && (
                <div className="border-b-2 border-gray-100 dark:border-gray-800 mt-6" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
