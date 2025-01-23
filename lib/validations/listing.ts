import { z } from "zod";

// Enums
export const SmartDeviceTypeEnum = z.enum([
  "THERMOSTAT",
  "LOCK",
  "LIGHTING",
  "SECURITY",
  "ENTERTAINMENT",
  "APPLIANCE",
]);

export const PropertyTypeEnum = z.enum([
  "APARTMENT",
  "HOUSE",
  "VILLA",
  "UNIQUE_SPACE",
  "ECO_LODGE",
  "SMART_HOME",
]);

export const ListingStatusEnum = z.enum([
  "ACTIVE",
  "MAINTENANCE",
  "UNAVAILABLE",
]);

export const AmenityTypeEnum = z.enum([
  // ESSENTIAL
  "WIFI",
  "AIR_CONDITIONING",
  "HEATING",
  "KITCHEN",
  "WASHER",
  "DRYER",

  // FEATURES
  "POOL",
  "HOT_TUB",
  "GYM",
  "WORKSPACE",
  "TV",

  // SAFETY
  "SMOKE_ALARM",
  "FIRST_AID",
  "FIRE_EXTINGUISHER",
  "SECURITY_CAMERAS",

  // LOCATION
  "BEACHFRONT",
  "WATERFRONT",
  "SKI_IN_OUT",

  // TRANSPORT
  "FREE_PARKING",
  "EV_CHARGER",
  "BIKE_RENTAL",
  "CAR_RENTAL",

  // SERVICES
  "BREAKFAST",
  "CLEANING",
  "CONCIERGE",
  "LUGGAGE_STORAGE",

  // OUTDOOR
  "PATIO",
  "BBQ_GRILL",
  "GARDEN",

  // ENTERTAINMENT
  "GAME_CONSOLE",
  "POOL_TABLE",
  "PIANO",
]);
//badge
export const Badge = z.enum([
  "SUPERHOST",
  "VERIFIED",
  "TOP_RATED",
  "ECO_FRIENDLY",
  "PREMIUM",
]);
export const ExperienceTypeEnum = z.enum(["VIRTUAL", "IN_PERSON", "HYBRID"]);

export const ReservationStatusEnum = z.enum([
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
]);

// Base schemas
export const LocationDataSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipCode: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export const SustainabilityMetricsSchema = z.object({
  energyRating: z.coerce.number().optional(),
  solarPowered: z.boolean(),
  waterEfficiency: z.coerce.number().optional(),
  wasteManagement: z.boolean(),
  carbonFootprint: z.coerce.number().optional(),
  greenCertified: z.boolean(),
  carbonOffset: z.coerce.number().optional(),
  renewableEnergySources: z.array(z.string()),
});

export const EnergyMetricSchema = z.object({
  timestamp: z.date(),
  consumption: z.coerce.number(),
  solar: z.coerce.number(),
  cost: z.coerce.number(),
});

export const AmenitySchema = z.object({
  type: AmenityTypeEnum,
});

export const SmartFeatureSchema = z.object({
  type: SmartDeviceTypeEnum,
  deviceId: z.string(),
  isActive: z.boolean(),
  batteryLevel: z.coerce.number().min(0).max(100),
  lastChecked: z.date(),
  manufacturer: z.string(),
  model: z.string(),
  firmwareVersion: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]).optional(),
  events: z.any(), // JSON type
});

export const ReviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  comment: z.string(),
  userId: z.string(),
});

export const ReservationSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  totalPrice: z.coerce.number().positive(),
  status: ReservationStatusEnum,
  checkInCode: z.string().optional(),
  virtualConciergeEnabled: z.boolean(),
  preferredTemperature: z.coerce.number().optional(),
  lightingPreferences: z.any().optional(), // JSON type
  specialRequests: z.string().optional(),
});

export const ExperienceSchema = z.object({
  type: ExperienceTypeEnum,
  title: z.string(),
  description: z.string(),
  date: z.date(),
  price: z.coerce.number().positive(),
  virtualGuide: z.boolean(),
  maxCapacity: z.coerce.number().positive(),
  duration: z.coerce.number().positive(),
  language: z.array(z.string()),
  includes: z.array(z.string()),
  location: z.any().optional(), // JSON type
  virtualLink: z.string().url().optional(),
  images: z.array(z.string().url()),
  cancellationPolicy: z.string().optional(),
  userRatings: z.coerce.number().min(0).max(5).optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  reviewCount: z.coerce.number().default(0),
  bookedCount: z.coerce.number().default(0),
  status: z.string().default("ACTIVE"),
});
//badge

// Main Listing Schema
export const ListingSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  image: z.string().url(),
  virtualTourUrl: z.string().url().optional(),
  arModelUrl: z.string().url().optional(),
  category: z.string(),
  type: PropertyTypeEnum,
  status: ListingStatusEnum.default("ACTIVE"),

  // Basic Info
  roomCount: z.coerce.number().int().min(1),
  bedroomCount: z.coerce.number().int().min(1),
  bathroomCount: z.coerce.number().int().min(1),
  guestCount: z.coerce.number().int().min(1),
  price: z.coerce.number().positive(),

  // Location
  locationData: LocationDataSchema,

  // Amenities
  amenities: z.array(AmenityTypeEnum),
  badge: z.array(Badge),

  // Sustainability and Energy
  energyRating: z.coerce.number().min(0).max(100).optional(),
  ecoFriendly: z.boolean().default(false),
  waterEfficiency: z.coerce.number().min(0).max(100).optional(),
  wasteManagement: z.boolean().default(false),
  carbonFootprint: z.coerce.number().optional(),
  greenCertified: z.boolean().default(false),
});

// Virtual Tour View Schema
export const VirtualTourViewSchema = z.object({
  duration: z.coerce.number().positive(),
  completed: z.boolean(),
  deviceInfo: z.any().optional(), // JSON type
  ipAddress: z.string().optional(),
  interactions: z.any().optional(), // JSON type
  exitPoint: z.string().optional(),
});

// Virtual Identity Schema
export const VirtualIdentitySchema = z.object({
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  preferences: z.any().optional(), // JSON type
  reputation: z.coerce.number().default(0),
});

// Types
export type TReview = z.infer<typeof ReviewSchema>;
export type TFavorite = { userId: string; listingId: string };
export type TListing = z.infer<typeof ListingSchema>;
export type TLocationData = z.infer<typeof LocationDataSchema>;
export type TReservation = z.infer<typeof ReservationSchema>;
export type TExperience = z.infer<typeof ExperienceSchema>;
export type TEnergyMetrics = z.infer<typeof EnergyMetricSchema>;
export type TSustainabilityMetrics = z.infer<
  typeof SustainabilityMetricsSchema
>;
