"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { UserRoundPen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useChangeProfilePicture } from "@/http/auth/update-profile-picture";
import { getErrorMessage } from "@/utils/error-response";
import { getImagePreviewUrl } from "@/utils/get-image-preview";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormUpdateProfilePicture() {
  const { data: session, status } = useSession();
  const isLoading = !session && status === "loading";
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.profile_picture) {
      setPreview(getImagePreviewUrl(session.user.profile_picture));
    } else {
      setPreview(null);
    }
  }, [session?.user?.profile_picture]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setSelectedFile(file);

    setPreview((current) => {
      if (current?.startsWith("blob:")) {
        URL.revokeObjectURL(current);
      }
      return URL.createObjectURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    multiple: false,
  });

  const { mutate: changeProfilePictureHandler, isPending } =
    useChangeProfilePicture({
      onSuccess: () => {
        toast.success("Berhasil memperbarui foto profil!");
        queryClient.invalidateQueries({ queryKey: ["get-auth"] });
        setSelectedFile(null);
      },
      onError: (error) => {
        toast.error("Gagal memperbarui foto profil!", {
          description: getErrorMessage(error),
        });
      },
    });

  const handleSubmit = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    changeProfilePictureHandler({ body: formData });
  };

  const fallbackName =
    session?.user?.name?.trim().charAt(0)?.toUpperCase() ?? "U";

  return (
    <div className="flex flex-col items-center gap-4">
      <div {...getRootProps()} className="relative cursor-pointer">
        <input {...getInputProps()} />

        {isLoading ? (
          <div className="relative">
            <Skeleton className="h-42 w-42 rounded-full" />

            <div className="absolute right-4 bottom-2">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ) : (
          <Avatar className="h-42 w-42 rounded-full border">
            {preview ? (
              <AvatarImage src={preview} alt="Preview Foto Profil" />
            ) : (
              <AvatarFallback className="rounded-full">
                <span className="text-4xl font-bold">{fallbackName}</span>
              </AvatarFallback>
            )}
          </Avatar>
        )}

        <div className="absolute right-4 bottom-2 rounded-full bg-primary p-2 text-primary-foreground shadow-md">
          <UserRoundPen className="h-4 w-4" />
        </div>

        {isDragActive && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-xs font-medium text-white">
            Drop
          </div>
        )}
      </div>

      {selectedFile && (
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Loading..." : "Simpan Perubahan"}
        </Button>
      )}
    </div>
  );
}
