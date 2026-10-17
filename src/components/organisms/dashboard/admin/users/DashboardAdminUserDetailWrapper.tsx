"use client";

import CardUserDetail from "@/components/molecules/card/users/CardUserDetail";
import { useGetDetailUser } from "@/http/users/get-detail-user";
import { useUpdateUser } from "@/http/users/update-user";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface DashboardAdminUserDetailWrapperProps {
  id: number;
}

export default function DashboardAdminUserDetailWrapper({
  id,
}: DashboardAdminUserDetailWrapperProps) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useGetDetailUser(
    id,
    session?.access_token ?? "",
    {
      enabled: status === "authenticated",
    }
  );

  const { mutate: updateUser, isPending: isUpdatingRole } = useUpdateUser({
    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(["get-detail-user", id], updatedUser);
      toast.success("Peran pengguna berhasil diperbarui.");
      await queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
    },
    onError: (error) => {
      toast.error("Gagal memperbarui peran pengguna.", {
        description: error.response?.data.message,
      });
    },
  });

  const toggleUstadz = () => {
    if (!data || !session?.access_token || data.data.role === "admin") return;

    updateUser({
      id,
      token: session.access_token,
      role: data.data.role === "ustadz" ? "user" : "ustadz",
    });
  };

  if (isPending) {
    return <p role="status">Memuat pengguna...</p>;
  }

  if (isError) {
    return <p role="alert">Detail pengguna tidak dapat dimuat. Silakan coba lagi.</p>;
  }

  return (
    <section>
      <CardUserDetail
        data={data?.data}
        onToggleUstadz={toggleUstadz}
        isUpdatingRole={isUpdatingRole}
      />
    </section>
  );
}
