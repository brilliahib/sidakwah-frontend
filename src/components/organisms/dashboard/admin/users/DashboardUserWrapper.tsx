"use client";

import AlertDialogDeleteUser from "@/components/atoms/alert-dialog/users/AlertDialogDeleteUser";
import AlertDialogResetPassword from "@/components/atoms/alert-dialog/users/AlertDialogResetPasswordUser";
import { userColumns } from "@/components/atoms/datacolumn/DataUser";
import SearchBar from "@/components/atoms/search/Searchbar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useDeleteuser } from "@/http/users/delete-user";
import { useGetAllUser } from "@/http/users/get-all-user";
import { useResetPassword } from "@/http/users/reset-password-user";
import { User } from "@/types/user/user";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardUserWrapper() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");

  const queryClient = useQueryClient();

  const [isSelectedResetPasswordUser, setIsSelectedResetPasswordUser] =
    useState<User | null>(null);

  const [isSelectedDeleteUser, setIsSelectedDeleteUser] = useState<User | null>(
    null,
  );

  const [isDialogResetPasswordOpen, setIsDialogResetPasswordOpen] =
    useState(false);

  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const resetPasswordHandler = (data: User) => {
    setIsSelectedResetPasswordUser(data);
    setIsDialogResetPasswordOpen(true);
  };

  const deleteUserHandler = (data: User) => {
    setIsSelectedDeleteUser(data);
    setIsDialogDeleteOpen(true);
  };

  const { data, isPending } = useGetAllUser(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const filteredData = (data?.data ?? []).filter((item: User) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const { mutate: resetPassword } = useResetPassword({
    onError: () => {
      toast.error("Gagal mereset password pengguna!");
    },
    onSuccess: () => {
      setIsSelectedResetPasswordUser(null);
      toast.success("Berhasil mereset password pengguna!");
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
    },
  });

  const { mutate: deleteUser } = useDeleteuser({
    onError: () => {
      toast.error("Gagal menghapus pengguna!");
    },
    onSuccess: () => {
      setIsSelectedDeleteUser(null);
      toast.success("Berhasil menghapus pengguna!");
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
    },
  });

  const handleResetPassword = () => {
    if (isSelectedResetPasswordUser) {
      resetPassword({
        id: isSelectedResetPasswordUser.id,
      });
    }
  };

  const handleDeleteUser = () => {
    if (isSelectedDeleteUser) {
      deleteUser({
        id: isSelectedDeleteUser.id,
        token: session?.access_token as string,
      });
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
        <SearchBar
          placeholder="Cari pengguna..."
          value={searchInput}
          onChange={setSearchInput}
        />
      </div>
      <DataTable
        columns={userColumns({
          resetPasswordHandler,
          deleteUserHandler,
        })}
        data={filteredData}
        isLoading={isPending}
      />

      {isSelectedResetPasswordUser && (
        <AlertDialogResetPassword
          open={isDialogResetPasswordOpen}
          setOpen={setIsDialogResetPasswordOpen}
          confirmReset={handleResetPassword}
        />
      )}

      {isSelectedDeleteUser && (
        <AlertDialogDeleteUser
          open={isDialogDeleteOpen}
          setOpen={setIsDialogDeleteOpen}
          confirmDelete={handleDeleteUser}
        />
      )}
    </section>
  );
}
