import z from "zod";

export const updateAccountSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email("Format email tidak valid").optional(),
  username: z.string().trim().min(1).optional(),
  phone_number: z.string().trim().optional(),
  address: z.string().trim().min(1).optional(),
});

export type UpdateAccountType = z.infer<typeof updateAccountSchema>;
