"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

import getCurrentUser from "./getCurrentUser";

interface IParams {
  listingId?: string;
}

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addFavoriteListings(listingId: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  try {
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const res = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    revalidatePath("/favorites");
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteFavoriteListing(listingId: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  try {
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const res = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    revalidatePath("/favorites");
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
