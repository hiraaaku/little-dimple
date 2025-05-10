import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string(),
    rememberMe: z.boolean().default(false)
});

export type LoginFormType = z.infer<typeof loginSchema>; 