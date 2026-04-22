import z from "zod";

export const addProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project title must be at least 3 characters")
    .max(100, "Project title must be under 100 characters"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),
});

export type AddProjectFields = z.infer<typeof addProjectSchema>;

export const addEpicSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),
  assignee_id: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return new Date(val) >= new Date(new Date().toDateString());
    }, "Deadline must be today or in the future"),
});

export type AddEpicFields = z.infer<typeof addEpicSchema>;
