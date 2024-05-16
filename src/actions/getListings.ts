"use server";

import { prisma } from "@/lib/db";

export async function getListings() {
  try {
    const listings = await prisma.listing.findMany();
    if (!listings) return null;
  } catch (error) {
    throw new Error(error);
  }
}
export default async function getListing(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id:listingId,
      },
      include:{
        Rooms:true
      }
    });
    return listing
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deleteListing(id: string) {
  try {
  } catch (error: any) {
    throw new Error(error);
  }
}
