"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye, FilePlay, SquarePen, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MaterialContent } from "@/types/material-contents/material-content";
import { Badge } from "@/components/ui/badge";

interface AlertDialogDeleteMaterialContentProps {
  deleteMaterialContentHandler: (data: MaterialContent) => void;
}

export const materialContentColumns = (
  props: AlertDialogDeleteMaterialContentProps,
): ColumnDef<MaterialContent>[] => [
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
        {row.original.title ?? "Belum ada judul"}
      </p>
    ),
  },
  {
    accessorKey: "module.title",
    header: "Sub Modul Dari",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.sub_modul?.title ?? "Belum dipilih"}
      </p>
    ),
  },
  {
    id: "publication_status",
    header: "Publikasi",
    cell: ({ row }) => (
      <Badge variant={row.original.published_at ? "default" : "outline"}>
        {row.original.published_at ? "Terbit" : "Belum terbit"}
      </Badge>
    ),
  },
  {
    id: "review_status",
    header: "Persetujuan",
    cell: ({ row }) => {
      const status = row.original.latest_revision?.status;
      const label = {
        draft: "Draft",
        pending: "Menunggu Ustadz",
        approved: "Disetujui",
        rejected: "Ditolak",
        superseded: "Digantikan",
      } as const;

      return status ? (
        <div className="space-y-1">
          <Badge variant={status === "rejected" ? "destructive" : status === "pending" ? "secondary" : "outline"}>
            {label[status]}
          </Badge>
          {status === "rejected" && row.original.latest_revision?.rejection_reason && (
            <p className="max-w-48 whitespace-normal text-xs text-muted-foreground">
              {row.original.latest_revision.rejection_reason}
            </p>
          )}
        </div>
      ) : <span className="text-muted-foreground">-</span>;
    },
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
            <Link
              href={`/dashboard/admin/material-contents/${data.id}/edit`}
              className="flex cursor-pointer items-center text-yellow-700 hover:underline"
            >
              <SquarePen className="h-4 w-4 text-yellow-700" />
              <span className="ml-2">Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline"
              onClick={() => props.deleteMaterialContentHandler(data)}
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
