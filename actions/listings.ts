"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";
import { ListingSchema, TListing } from "@/lib/validations/listing";

interface IParams {
  title?: string;
  locationData?: {
    country?: string;
    city?: string;
    state?: string;
  };
}

export async function getListings(searchParams: IParams) {
  try {
    const { title, locationData } = searchParams;

    const listings = await prisma.listing.findMany({
      where: {
        title: { contains: title },
      },
    });

    return { success: true, data: listings };
  } catch (error) {
    console.error("[LISTINGS_GET]", error);
    return { success: false, error: "Failed to fetch listings" };
  }
}

export async function getUserListings(userId: string) {
  const session = await auth();
  if (!session?.user || session?.user.id !== userId) {
    throw new Error("Unauthorized");
  }
  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId,
      },
    });
    return { success: true, data: listings };
  } catch (error) {
    console.error("Error fetching user listings:", error);
    return { success: false, error: "Failed to fetch user listings" };
  }
}

export async function createListing(data: TListing, userId: string) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user || session?.user.id !== userId) {
      return { success: false, error: "Unauthorized access" };
    }

    // Validate input data
    const result = ListingSchema.safeParse(data);

    if (!result.success) {
      console.error("Validation error:", result.error.errors);
      return {
        success: false,
        error: "Invalid listing data",
        details: result.error.errors,
      };
    }

    const { amenities, ...restData } = result.data;

    const listing = await prisma.listing.create({
      data: {
        ...restData,
        userId,
        amenities: {
          set: amenities || [],
        },
      },
    });

    revalidatePath("/dashboard/listings");
    return { success: true, data: listing };
  } catch (error) {
    console.error("Error creating listing:", error);
    return { success: false, error: "Failed to create listing" };
  }
}

export async function updateListing(
  data: TListing,
  listingId: string,
  userId: string,
) {
  try {
    const session = await auth();
    if (session?.user?.id !== userId) {
      return { success: false, error: "Unauthorized access" };
    }

    const result = ListingSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        error: "Invalid listing data",
        details: result.error.errors,
      };
    }

    const processedData = {
      ...result.data,
      userId: userId,
      amenities: {
        set: result.data.amenities,
      },
    };

    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: processedData,
    });

    revalidatePath("/dashboard/listings");
    return { success: true, data: updatedListing };
  } catch (error) {
    console.error("Error updating listing:", error);
    return { success: false, error: "Failed to update listing" };
  }
}

export async function getListingById(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return { success: false, error: "Listing not found" };
    }

    return { success: true, data: listing };
  } catch (error) {
    console.error("Error fetching listing:", error);
    return { success: false, error: "Failed to fetch listing" };
  }
}

export async function deleteListingById(listingId: string) {
  try {
    const session = await auth();
    if (!session?.user || !session?.user.id) {
      return { success: false, error: "Unauthorized access" };
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return { success: false, error: "Listing not found" };
    }

    if (listing.userId !== session?.user.id) {
      return { success: false, error: "You can only delete your own listings" };
    }

    await prisma.listing.delete({
      where: {
        id: listingId,
      },
    });

    revalidatePath("/dashboard/listings");
    return { success: true, message: "Listing has been deleted" };
  } catch (error) {
    console.error("Error deleting listing:", error);
    return { success: false, error: "Failed to delete listing" };
  }
}
