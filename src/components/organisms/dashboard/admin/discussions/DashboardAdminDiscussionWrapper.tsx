"use client";

import AlertDialogDeleteDiscussion from "@/components/atoms/alert-dialog/discussions/AlertDialogDeleteDiscussion";
import { discussionsColumns } from "@/components/atoms/datacolumn/DataDiscussions";
import DialogDetailDiscussion from "@/components/atoms/dialog/discussions/DialogDetailDiscussion";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useDeleteComment } from "@/http/comments/delete-comment";
import { useGetComment } from "@/http/comments/get-comment";
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

  const { data, isPending } = useGetComment(session?.access_token as string, {
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

  const { mutate: deleteDiscussion, isPending: isDeleting } = useDeleteComment({
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
