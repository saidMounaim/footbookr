import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const pitchFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.string().min(1, "Please select a pitch type."),
  pricePerHour: z.coerce.number().min(1, "Price must be at least $1."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  rules: z.array(
    z.object({ value: z.string().min(1, "Rule cannot be empty") })
  ),
  images: z.array(z.string()).min(1, "At least one image is required."),
});

export const createBookingSchema = z.object({
  pitchId: z.string().min(1, "Pitch ID is required"),
  date: z.coerce.date(),
  startTime: z.string().regex(/^\d{1,2}:\d{2}$/, "Invalid time format"),
});
