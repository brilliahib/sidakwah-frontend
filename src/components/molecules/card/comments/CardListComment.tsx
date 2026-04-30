import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, BookOpen, ArrowRight } from "lucide-react";
import { Comment } from "@/types/comments/comment";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Session } from "next-auth";

interface CardListCommentProps {
  data?: Comment[];
  isPending?: boolean;
  session?: Session;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CommentCard({
  comment,
  session,
}: {
  comment: Comment;
  session?: Session;
}) {
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
    locale: id,
  });

  const isOwner = session?.user?.id === comment.user_id;

  return (
    <Link
      href={`/dashboard/modules/${comment.material_content?.sub_modul.modul.id}/contents/${comment.material_content_id}`}
      className="block"
    >
      <Card className="border-slate-200 rounded-2xl shadow-none relative overflow-hidden group transition-shadow duration-200 hover:border-green-600">
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-green-600/10 text-green-600 text-[11px] font-medium px-2.5 py-1 rounded-full opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
          <ArrowRight size={10} />
          Lihat Detail
        </div>
        <CardContent>
          <div className="flex gap-3 mb-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={comment.user?.profile_picture || undefined} />
              <AvatarFallback>
                {comment.user?.name ? getInitials(comment.user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-start gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-800">
                    {comment.user?.name}
                  </p>
                  {isOwner && (
                    <Badge className="bg-green-600 hover:bg-green-600 text-white text-[10px] font-medium px-2 py-0 rounded-full h-4">
                      Anda
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{timeAgo}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed ml-13 mb-3">
            {comment.content}
          </p>

          {comment.material_content && (
            <div className="ml-13 mb-3">
              <Badge
                variant="outline"
                className="gap-1.5 text-green-600 border-green-200 bg-green-50 rounded-lg px-2.5 py-1 text-xs font-medium"
              >
                <BookOpen size={11} />
                {comment.material_content.title}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function CardListComment({
  data,
  isPending,
  session,
}: CardListCommentProps) {
  if (isPending) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-2xl border-slate-200">
            <CardContent>
              <div className="flex gap-3 mb-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              </div>
              <div className="ml-12 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-6 w-48 rounded-lg mt-3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="border-slate-200 rounded-2xl">
        <CardContent className="p-10 text-center text-slate-400">
          <MessageCircle size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Belum ada komentar.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((comment) => (
        <CommentCard key={comment.id} comment={comment} session={session} />
      ))}
    </div>
  );
}
