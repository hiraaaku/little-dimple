import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string(),
    rememberMe: z.boolean().default(false)
});

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    full_name: z.string().min(1, "Full name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    province_id: z.string().min(1, "Province ID is required"),
    province_name: z.string().min(1, "Province name is required"),
    city_id: z.string().min(1, "City ID is required"),
    city_name: z.string().min(1, "City name is required"),
    subdistrict_id: z.string().min(1, "Subdistrict ID is required"),
    subdistrict_name: z.string().min(1, "Subdistrict name is required"),
});

export type LoginFormType = z.infer<typeof loginSchema>;
export type RegisterFormType = z.infer<typeof registerSchema>; 