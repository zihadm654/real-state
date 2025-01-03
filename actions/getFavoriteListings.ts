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
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addFavoriteListings(params: IParams) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  try {
    const { listingId } = params;

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId!);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    revalidatePath("/favorites");
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deleteFavoriteListing(params: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  try {
    const { listingId } = params;
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    revalidatePath("/favorites");
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
