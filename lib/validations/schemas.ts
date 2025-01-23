import z from "zod";

import {
  AmenityTypeEnum,
  Badge,
  ListingSchema,
  LocationDataSchema,
} from "./listing";

export const stepOneSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
});
export const stepTwoSchema = z.object({
  price: z.number().int().min(1, { message: "price must be greater than 0" }),
  roomCount: z
    .number()
    .int()
    .min(1, { message: "rooms must be greater than 0" }),
  guestCount: z
    .number()
    .int()
    .min(1, { message: "guest must be greater than 0" }),
  bedroomCount: z
    .number()
    .int()
    .min(1, { message: "bed must be greater than 0" }),
  bathroomCount: z
    .number()
    .int()
    .min(1, { message: "bathroom must be greater than 0" }),
});

export const stepThreeSchema = z.object({
  images: z.array(
    z.string().min(1, { message: "image url should be atleast 1 char" }),
  ),
  virtualTourUrl: z.string().url().optional(),
  arModelUrl: z.string().url().optional(),
  amenities: z
    .array(AmenityTypeEnum)
    .min(1, "At least one amenity is required"),
});
export const stepFourSchema = z.object({
  // Location
  locationData: LocationDataSchema,

  // Amenities
  amenities: z.array(AmenityTypeEnum),

  // Sustainability and Energy
  energyRating: z.coerce.number().min(0).max(100).optional(),
  ecoFriendly: z.boolean().default(false),
  waterEfficiency: z.coerce.number().min(0).max(100).optional(),
  wasteManagement: z.boolean().default(false),
  carbonFootprint: z.coerce.number().optional(),
  greenCertified: z.boolean().default(false),
  badge: z.array(Badge),
});
export const newDealSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  ...stepFourSchema.shape,
});

export const newDealInitialValuesSchema = ListingSchema;
export type NewDealType = z.infer<typeof newDealSchema>;
export type NewDealInitialValuesType = z.infer<
  typeof newDealInitialValuesSchema
>;
