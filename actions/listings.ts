"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";
import { listingSchema, TListing } from "@/lib/validations/listing";

interface IParams {
  title?: string;
  location?: string;
}
export async function getListings(searchParams: IParams) {
  try {
    const { title, location } = searchParams;

    const listings = await prisma.listing.findMany({
      where: {
        title: { contains: title },
        location,
      },
    });
    return listings;
  } catch (error) {
    return { error: error };
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
    return listings;
  } catch (error) {
    return { error: error };
  }
}
export async function createListing(data: TListing, userId: string) {
  const session = await auth();
  if (!session?.user || session?.user.id !== userId) {
    throw new Error("Unauthorized");
  }
  const result = listingSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.success) {
    try {
      await prisma.listing.create({
        data: { ...result.data, userId: userId },
      });
      revalidatePath("/dashboard/listings");
      return { success: "hotel has been created" };
    } catch (error) {
      return { error: error };
    }
  }

  // TODO: perform desired action / mutation
  revalidatePath("/dashboard/listings");
}

export async function updateHotel(
  data: TListing,
  listingId: string,
  userId: string,
) {
  const session = await auth();
  if (!session?.user || session?.user.id !== userId) {
    throw new Error("Unauthorized");
  }
  const result = listingSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.success) {
    try {
      await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: { ...result.data, userId: userId },
      });
      revalidatePath("/dashboard/listings");
      return { success: "listing has been updated" };
    } catch (error) {
      return { error: error };
    }
  }

  // TODO: perform desired action / mutation
}

export async function getListingById(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) return null;

    revalidatePath("/dashboard/listings");
    return listing;
  } catch (error: any) {
    // throw new Error(error);
    console.log(error);
  }
}
export async function deleteListingById(listingId: string) {
  const session = await auth();
  if (!session?.user || session?.user.id) {
    throw new Error("Unauthorized");
  }
  try {
    await prisma.listing.delete({
      where: {
        id: listingId,
      },
    });
    revalidatePath("/dashboard/listings");
    return { success: "hotel has been deleted" };
  } catch (error: any) {
    throw new Error(error);
  }
}
