import z from "zod";

export const subModulesSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Judul harus memiliki minimal 3 karakter" }),
  description: z.string().optional(),
  modul_id: z.number().min(1, { message: "Modul harus dipilih" }),
});

export type SubModulesType = z.infer<typeof subModulesSchema>;
