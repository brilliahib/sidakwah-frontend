"use client";

import AlertDialogDeleteDiscussion from "@/components/atoms/alert-dialog/discussions/AlertDialogDeleteDiscussion";
import { discussionsColumns } from "@/components/atoms/datacolumn/DataDiscussions";
import DialogDetailDiscussion from "@/components/atoms/dialog/discussions/DialogDetailDiscussion";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useDeleteComment } from "@/http/comments/delete-comment";
import { useGetComment } from "@/http/comments/get-comment";
import { CommentModerationStatus, useModerateComment } from "@/http/comments/moderate-comment";
import { Comment } from "@/types/comments/comment";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/error-response";

export default function DashboardAdminDiscussionWrapper() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const [selectedDeleteDiscussion, setSelectedDeleteDiscussion] =
    useState<Comment | null>(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const [selectedDetailDiscussion, setSelectedDetailDiscussion] =
    useState<Comment | null>(null);
  const [isDialogDetailOpen, setIsDialogDetailOpen] = useState(false);

  const queryClient = useQueryClient();

  const viewerKey = `${session?.user?.id ?? "anonymous"}:${session?.user?.role ?? ""}`;
  const { data, isPending } = useGetComment(session?.access_token as string, viewerKey, {
    enabled: status === "authenticated",
  });

  const deleteDiscussionHandler = (data: Comment) => {
    setSelectedDeleteDiscussion(data);
    setIsDialogDeleteOpen(true);
  };

  const viewDetailHandler = (data: Comment) => {
    setSelectedDetailDiscussion(data);
    setIsDialogDetailOpen(true);
  };

  // Extract all top-level comments and sort by created_at desc
  const allComments = data?.data ?? [];
  const filteredData = allComments.filter(
    (item: Comment) =>
      item.content.toLowerCase().includes(searchInput.toLowerCase()) ||
      (item.user?.name &&
        item.user.name.toLowerCase().includes(searchInput.toLowerCase()))
  );

  filteredData.sort((left, right) => {
    if (left.status === "pending" && right.status !== "pending") return -1;
    if (right.status === "pending" && left.status !== "pending") return 1;
    return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
  });

  const { mutate: deleteDiscussion } = useDeleteComment({
    onError: (error) => {
      toast.error("Gagal menghapus komentar!", {
        description: getErrorMessage(error),
      });
    },
    onSuccess: () => {
      setIsDialogDeleteOpen(false);
      setSelectedDeleteDiscussion(null);
      toast.success("Berhasil menghapus komentar!");
      queryClient.invalidateQueries({
        queryKey: ["get-comment"],
      });
    },
  });

  const { mutate: moderateDiscussion, isPending: isModerating } = useModerateComment({
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["get-comment"] });
      if (error.response?.status === 409) {
        toast.error("Diskusi ini sudah ditinjau admin lain.", {
          description: "Daftar diskusi telah diperbarui.",
        });
        return;
      }
      toast.error("Gagal memperbarui status diskusi.", {
        description: getErrorMessage(error),
      });
    },
    onSuccess: (_response, variables) => {
      toast.success(variables.status === "approved" ? "Diskusi disetujui." : "Diskusi ditolak.");
      queryClient.invalidateQueries({ queryKey: ["get-comment"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-comments"] });
    },
  });

  const moderateDiscussionHandler = (data: Comment, nextStatus: CommentModerationStatus) => {
    moderateDiscussion({ id: data.id, status: nextStatus });
  };

  const handleDeleteDiscussion = () => {
    if (selectedDeleteDiscussion) {
      deleteDiscussion({
        id: selectedDeleteDiscussion.id,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
        <SearchBar
          placeholder="Cari pengguna atau komentar..."
          value={searchInput}
          onChange={setSearchInput}
        />
      </div>
      
      <DataTable
        data={filteredData}
        columns={discussionsColumns({
          deleteDiscussionHandler,
          viewDetailHandler,
          moderateDiscussionHandler,
          isModerating,
        })}
        isLoading={isPending}
      />

      <DialogDetailDiscussion
        open={isDialogDetailOpen}
        setOpen={setIsDialogDetailOpen}
        comment={selectedDetailDiscussion}
      />

      <AlertDialogDeleteDiscussion
        open={isDialogDeleteOpen}
        setOpen={setIsDialogDeleteOpen}
        confirmDelete={handleDeleteDiscussion}
      />
    </div>
  );
}
