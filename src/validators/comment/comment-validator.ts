import z from "zod";

export const commentSchema = z.object({
  material_content_id: z.number().min(1, "Material Content ID is required"),
  parent_id: z.number().nullable(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be at most 5000 characters"),
});

export type CommentType = z.infer<typeof commentSchema>;
