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

export const PlacesForm = z.object({
  title: z.string().min(1, "firstName is required."),
  description: z.string().min(3, "lastName is required"),
  listing_status: z.string(),
  lat: z.number().positive(),
  long: z.number().positive(),
  businessNature: z.string().min(1, "should be sent"),
  individualNbr: z.string().optional(),
  individualTaxIdNbr: z.string().optional(),
  businessRegistrationNbr: z.string().optional(),
  businessTaxIdNbr: z.string().optional(),
  street: z.string().min(4, "password must be greater than 4 char"),
  city: z.string(),
  province: z.string(),
  postal_code: z.string(),
  country: z.string(),
  subtitle: z.string().optional(),
  place_type: z.string().optional(),
  booking_policy: z.string().optional(),
  id: z.string(),
  rating: z.number(),
  count: z.object({
    rooms: z.number(),
    bookings: z.number(),
    reviews: z.number(),
  }),
  images: z.array(z.string()),
});

export const ListingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1, "title is required"),
  description: z.string().min(3, "description is required"),
  image: z.string().min(1, "image is required"),
  country: z.string().min(1, "country is required"),
  state: z.string(),
  city: z.string(),
  locationValue: z.string(),
  gym: z.boolean(),
  spa: z.boolean(),
  bar: z.boolean(),
  laundry: z.boolean(),
  restaurant: z.boolean(),
  shopping: z.boolean(),
  freeparking: z.boolean(),
  bikeRental: z.boolean(),
  freeWifi: z.boolean(),
  movieNights: z.boolean(),
  swimmingPool: z.boolean(),
  coffeShop: z.boolean(),
});

export type TListing = z.infer<typeof ListingSchema>;
export type TPlaces = z.infer<typeof PlacesForm>;
export type TRegister = z.infer<typeof RegisterSchema>;
export type TLogin = z.infer<typeof LoginSchema>;
