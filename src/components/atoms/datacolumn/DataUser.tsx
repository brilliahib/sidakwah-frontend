"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye, KeyRound, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user/user";

interface DataUserProps {
  resetPasswordHandler: (data: User) => void;
  deleteUserHandler: (data: User) => void;
}

export const userColumns = (props: DataUserProps): ColumnDef<User>[] => [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Pengguna",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.name}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.email ?? "Tidak ada email"}
      </p>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.username ?? "Tidak ada username"}
      </p>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Bergabung Pada",
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
              href={`/dashboard/admin/users/${data.id}`}
              className="flex items-center text-gray-700 hover:underline"
            >
              <Eye className="h-4 w-4 text-gray-700" />
              <span className="ml-2">Detail</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="flex cursor-pointer items-center text-yellow-700 hover:underline"
              onClick={() => props.resetPasswordHandler(data)}
            >
              <KeyRound className="h-4 w-4 text-yellow-700" />
              <span className="ml-2">Reset Password</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline"
              onClick={() => props.deleteUserHandler(data)}
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
