import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ListingSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z
    .string()
    .min(10, { message: "description should be atleast 10 characters" }),
  image: z.string().min(1, { message: "country is required" }),
  location: z.string().min(1, { message: "country is required" }),
  guests: z.coerce.number().positive({ message: "number is required" }),
  bedrooms: z.coerce.number().positive({ message: "number is required" }),
  rooms: z.coerce.number().positive({ message: "number is required" }),
  bathrooms: z.coerce.number().positive({ message: "number is required" }),
  price: z.coerce.number().positive(),
  category: z.string().min(1, { message: "category is required" }),
});

export type TListing = z.infer<typeof ListingSchema>;
export type TRegister = z.infer<typeof RegisterSchema>;
export type TLogin = z.infer<typeof LoginSchema>;
