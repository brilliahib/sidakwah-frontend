import { Badge } from "@/components/ui/badge";
import { Comment } from "@/types/comments/comment";

const moderationLabels: Record<Comment["status"], string> = {
  pending: "Menunggu persetujuan",
  approved: "Disetujui",
  rejected: "Ditolak",
};

export default function CommentModerationBadge({
  status,
}: {
  status: Comment["status"];
}) {
  const variant = status === "rejected" ? "destructive" : "secondary";
  const stateClass = status === "pending"
    ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
    : status === "approved"
      ? "border-primary/30 bg-primary/10 text-primary"
      : "";

  return (
    <Badge variant={variant} className={stateClass}>
      {moderationLabels[status]}
    </Badge>
  );
}
