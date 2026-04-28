import z from "zod";

export const addTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),
  epic_id: z.string().optional(),
  assignee_id: z.string().optional(),
  due_date: z.string().optional(),
  status: z.enum([
    "TO_DO",
    "IN_PROGRESS",
    "BLOCKED",
    "IN_REVIEW",
    "READY_FOR_QA",
    "REOPENED",
    "READY_FOR_PRODUCTION",
    "DONE",
  ]),
});

export type AddTaskFields = z.infer<typeof addTaskSchema>;
