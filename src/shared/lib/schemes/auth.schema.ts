import z from "zod";

export const signupSchema = z
  .object({
    Name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long")
      .regex(
        /^[\p{L}]+(?:\s[\p{L}]+)*$/u,
        "Name must contain only letters and single spaces between words",
      ),
    Email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    Password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters")
      .regex(/^\S*$/, "Password must not contain spaces")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "Must contain at least one special character (!@#$%^&*)",
      ),
    ConfirmPassword: z.string().min(1, "Please confirm your password"),
    JobTitle: z.string().min(1, "Job title is required"),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

export type SignupFields = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  Email: z.string().min(1, "Email is required").email("Invalid email address"),
  Password: z.string().nonempty("Password is required"),
  RememberMe: z.boolean().optional(),
});

export type LoginFielsds = z.infer<typeof loginSchema>;
