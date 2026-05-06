import { z } from "zod";

export const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type InviteMemberFields = z.infer<typeof inviteMemberSchema>;
