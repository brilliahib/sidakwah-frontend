import { z } from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Password saat ini wajib diisi"),
    new_password: z.string().min(6, "Password baru minimal 6 karakter"),
    new_password_confirmation: z
      .string()
      .min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Konfirmasi password tidak sama",
    path: ["new_password_confirmation"],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
