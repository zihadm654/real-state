"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

import getCurrentUser from "./getCurrentUser";

export interface IListingsParams {
  userId?: string;
  guests?: number;
  rooms?: number;
  bathrooms?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      rooms,
      guests,
      bathrooms,
      location,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (rooms) {
      query.rooms = {
        gte: +rooms,
      };
    }

    if (guests) {
      query.guests = {
        gte: +guests,
      };
    }

    if (bathrooms) {
      query.bathrooms = {
        gte: +bathrooms,
      };
    }

    if (location) {
      query.location = location;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt,
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

interface IParams {
  listingId?: string;
}

export async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt,
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt,
        updatedAt: listing.user.updatedAt,
        emailVerified: listing.user.emailVerified || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deleteListingById(params: IParams) {
  const currentUser = await getCurrentUser();
  try {
    const { listingId } = params;

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser?.id,
      },
    });
    revalidatePath("/listings");
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
