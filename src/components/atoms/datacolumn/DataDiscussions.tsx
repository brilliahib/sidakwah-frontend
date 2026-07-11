"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Comment } from "@/types/comments/comment";

interface DataDiscussionsProps {
  deleteDiscussionHandler: (data: Comment) => void;
  viewDetailHandler: (data: Comment) => void;
}

export const discussionsColumns = (
  props: DataDiscussionsProps,
): ColumnDef<Comment>[] => [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "user.name",
    header: "Pengguna",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="font-semibold">
        {row.original.user?.name ?? "Anonim"}
      </p>
    ),
  },
  {
    accessorKey: "content",
    header: "Komentar",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-2 max-w-sm">
        {row.original.content}
      </p>
    ),
  },
  {
    accessorKey: "material_content.title",
    header: "Konten Materi",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-2 italic text-muted-foreground">
        {row.original.material_content?.title ?? "Tidak diketahui"}
      </p>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => (
      <p suppressHydrationWarning>
        {format(new Date(row.original.created_at), "EEEE, d MMM yyyy, HH:mm", {
          locale: id,
        })}
      </p>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem>
            <div
              className="flex cursor-pointer items-center text-gray-700 hover:underline w-full"
              onClick={() => props.viewDetailHandler(data)}
            >
              <Eye className="h-4 w-4 text-gray-700" />
              <span className="ml-2">Detail</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline w-full"
              onClick={() => props.deleteDiscussionHandler(data)}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
              <span className="ml-2">Hapus</span>
            </div>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
