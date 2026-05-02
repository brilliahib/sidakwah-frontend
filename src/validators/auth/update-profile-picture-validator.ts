import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const updateProfilePictureSchema = z.object({
  profile_picture: z
    .instanceof(File, { message: "Foto profil wajib dipilih" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Ukuran gambar maksimal 2 MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format gambar harus JPG, JPEG, atau PNG",
    }),
});

export type UpdateProfilePictureType = z.infer<
  typeof updateProfilePictureSchema
>;
