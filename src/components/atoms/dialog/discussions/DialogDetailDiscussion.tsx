import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Comment } from "@/types/comments/comment";
import { getImagePreviewUrl } from "@/utils/get-image-preview";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

interface DialogDetailDiscussionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  comment: Comment | null;
}

export default function DialogDetailDiscussion({
  open,
  setOpen,
  comment,
}: DialogDetailDiscussionProps) {
  if (!comment) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Diskusi</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex-shrink-0">
              {comment.user?.profile_picture ? (
                <Image
                  src={getImagePreviewUrl(comment.user.profile_picture) || ""}
                  alt={comment.user.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {comment.user?.name?.charAt(0) || "A"}
                </div>
              )}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="font-semibold">
                  {comment.user?.name || "Anonim"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(
                    new Date(comment.created_at),
                    "EEEE, d MMM yyyy, HH:mm",
                    {
                      locale: id,
                    },
                  )}
                </p>
              </div>
              <p className="text-sm mt-2 whitespace-pre-wrap">
                {comment.content}
              </p>

              {comment.material_content?.title && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground">
                    Diposting pada materi:
                  </p>
                  <p className="text-sm font-semibold italic text-primary">
                    {comment.material_content.title}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-4 ml-8">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Balasan:
              </h4>
              {comment.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="flex items-start gap-4 p-3 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {reply.user?.profile_picture ? (
                      <Image
                        src={reply.user.profile_picture}
                        alt={reply.user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full object-cover w-8 h-8"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-sm">
                        {reply.user?.name?.charAt(0) || "A"}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <p className="font-semibold text-sm">
                        {reply.user?.name || "Anonim"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {format(
                          new Date(reply.created_at),
                          "dd MMM yyyy, HH:mm",
                          {
                            locale: id,
                          },
                        )}
                      </p>
                    </div>
                    <p className="text-sm mt-1 whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
