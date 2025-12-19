"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye, FilePlay, SquarePen, Trash2, Video } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MaterialContent } from "@/types/material-contents/material-content";
import { Badge } from "@/components/ui/badge";

export const materialContentColumns: ColumnDef<MaterialContent>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.title}
      </p>
    ),
  },
  {
    accessorKey: "module.title",
    header: "Sub Modul Dari",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.sub_modul.title}
      </p>
    ),
  },
  {
    accessorKey: "youtube_link",
    header: "Video",
    cell: ({ row }) => {
      const youtubeLink = row.original.youtube_link;

      if (!youtubeLink) {
        return <Badge variant="destructive">Tidak ada video</Badge>;
      }

      return (
        <Link href={row.original.youtube_link!} target="_blank">
          <FilePlay className="h-5 w-5 text-primary" />
        </Link>
      );
    },
  },
  {
    accessorKey: "article_title",
    header: "Artikel",
    cell: ({ row }) => {
      const articleTitle = row.original.article_title;

      if (!articleTitle) {
        return <Badge variant="destructive">Tidak ada artikel</Badge>;
      }

      return (
        <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
          {articleTitle}
        </p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Dibuat Pada",
    cell: ({ row }) => (
      <p suppressHydrationWarning>
        {format(new Date(row.original.created_at), "EEEE, d MMMM yyyy, HH:mm", {
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
            <Link
              href={`/dashboard/admin/material-contents/${data.id}`}
              className="flex items-center text-gray-700 hover:underline"
            >
              <Eye className="h-4 w-4 text-gray-700" />
              <span className="ml-2">Detail</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex cursor-pointer items-center text-yellow-700 hover:underline">
              <SquarePen className="h-4 w-4 text-yellow-700" />
              <span className="ml-2">Edit</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline">
              <Trash2 className="h-4 w-4 text-red-600" />
              <span className="ml-2">Hapus</span>
            </div>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
