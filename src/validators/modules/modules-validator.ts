import z from "zod";

export const modulesSchema = z.object({
  title: z.string().min(1, { message: "Judul modul harus diisi." }),
  description: z.string().optional(),
});

export type ModulesType = z.infer<typeof modulesSchema>;
