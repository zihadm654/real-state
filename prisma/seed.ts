import {
  AmenityType,
  Badge,
  PrismaClient,
  PropertyType,
  UserRole,
} from "@prisma/client";

const prisma = new PrismaClient();

// Constants for seed data
const SEED_USERS = [
  {
    email: "host@example.com",
    name: "Host User",
    role: "HOST" as UserRole,
  },
  {
    email: "guest@example.com",
    name: "Guest User",
    role: "USER" as UserRole,
  },
] as const;

const SEED_LISTINGS = [
  {
    title: "Smart Home Villa",
    description: "Modern villa with smart features and eco-friendly design",
    image: "https://example.com/smart-villa.jpg",
    type: PropertyType.SMART_HOME,
    category: "VILLA",
    roomCount: 4,
    bedroomCount: 3,
    bathroomCount: 2,
    guestCount: 8,
    price: 250,
    locationData: {
      lat: 51.5074,
      lng: -0.1278,
      country: "United Kingdom",
      city: "London",
      address: "123 Smart Street",
    },
    amenities: [
      AmenityType.WIFI,
      AmenityType.WORKSPACE,
      AmenityType.AIR_CONDITIONING,
    ],
    badge: [Badge.PREMIUM, Badge.ECO_FRIENDLY],
    energyRating: 5,
    ecoFriendly: true,
    solarPowered: true,
    waterEfficiency: 4.5,
  },
  // Add more listings as needed
];

async function main() {
  try {
    console.log("🌱 Starting database seed...");

    // Batch create users
    const users = await Promise.all(
      SEED_USERS.map(async (userData) => {
        return prisma.user.upsert({
          where: { email: userData.email },
          update: {},
          create: userData,
        });
      }),
    );

    console.log(`✅ Created ${users.length} users`);

    // Batch create listings
    const listings = await Promise.all(
      SEED_LISTINGS.map(async (listingData, index) => {
        return prisma.listing.create({
          data: {
            ...listingData,
            userId: users[0].id, // Assign to first host user
          },
        });
      }),
    );

    console.log(`✅ Created ${listings.length} listings`);

    console.log("✅ Seed completed successfully");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
