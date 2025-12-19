import { z } from "zod";

export const materialContentSchema = z.object({
  sub_modul_id: z.number().min(1, { message: "Sub modul harus dipilih" }),
  title: z
    .string()
    .min(3, { message: "Judul minimal 3 karakter" })
    .max(255, { message: "Judul maksimal 255 karakter" }),
  youtube_link: z
    .string()
    .url({ message: "Link YouTube tidak valid" })
    .nullable()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val || val === "") return true;
        return val.includes("youtube.com") || val.includes("youtu.be");
      },
      { message: "Link harus berasal dari YouTube" }
    ),
  article_title: z
    .string()
    .max(255, { message: "Judul artikel maksimal 255 karakter" })
    .nullable()
    .optional(),
  article_content: z.string().optional().or(z.literal("")),
  article_images: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "File harus berupa gambar (JPG, JPEG, atau PNG)",
      }
    )
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2 MB",
    })
    .nullable()
    .optional(),
});

export type MaterialContentType = z.infer<typeof materialContentSchema>;
