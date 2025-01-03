import z from "zod";

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
});

export const stepTwoSchema = z.object({
  image: z.string().min(1, { message: "image url should be atleast 1 char" }),
});
export const stepThreeSchema = z.object({
  location: z
    .string()
    .min(1, { message: "image url should be atleast 1 char" }),
});

export const stepFourSchema = z.object({
  price: z.number().int().min(1, { message: "price must be greater than 0" }),
  room: z.number().int().min(1, { message: "rooms must be greater than 0" }),
  guest: z.number().int().min(1, { message: "guest must be greater than 0" }),
  bed: z.number().int().min(1, { message: "bed must be greater than 0" }),
  bathroom: z
    .number()
    .int()
    .min(1, { message: "bathroom must be greater than 0" }),
  wifi: z.boolean().default(false),
  breakfastPrice: z
    .number()
    .int()
    .min(0, { message: "breakfast price must be greater than 0" }),
  breakfast: z.boolean().default(false),
  roomService: z.boolean().default(false),
  parking: z.boolean().default(false),
  pool: z.boolean().default(false),
  balcony: z.boolean().default(false),
});

export const newDealSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  ...stepFourSchema.shape,
});

export const newDealInitialValuesSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  price: z.number().optional(),
  room: z.number().optional(),
  guest: z.number().optional(),
  bed: z.number().optional(),
  bathroom: z.number().optional(),
  wifi: z.boolean().optional(),
  breakfastPrice: z.number().optional(),
  breakfast: z.boolean().optional(),
  roomService: z.boolean().optional(),
  parking: z.boolean().optional(),
  pool: z.boolean().optional(),
  balcony: z.boolean().optional(),
});

export type NewDealType = z.infer<typeof newDealSchema>;
export type NewDealInitialValuesType = z.infer<
  typeof newDealInitialValuesSchema
>;
