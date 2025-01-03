import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
  image: z.string().min(1, { message: "image url should be atleast 1 char" }),
  location: z.string().min(2, {
    message: "location must be at least 2 characters.",
  }),
  room: z.coerce
    .number()
    .int()
    .min(0, { message: "rooms must be greater than 0" }),
  guest: z.coerce
    .number()
    .int()
    .min(0, { message: "guest must be greater than 0" }),
  bed: z.coerce
    .number()
    .int()
    .min(0, { message: "bed must be greater than 0" }),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "price must be greater than 0" }),
  breakfastPrice: z.coerce
    .number()
    .int()
    .min(0, { message: "breakfast price must be greater than 0" }),
  bathroom: z.coerce
    .number()
    .int()
    .min(1, { message: "bathroom must be greater than 0" }),
  wifi: z.boolean().default(false),
  breakfast: z.boolean().default(false),
  roomService: z.boolean().default(false),
  parking: z.boolean().default(false),
  pool: z.boolean().default(false),
  balcony: z.boolean().default(false),
});

export type TListing = z.infer<typeof listingSchema>;
