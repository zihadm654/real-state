"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

import getCurrentUser from "./getCurrentUser";

interface IParams {
  listingId?: string;
}

// export default async function getFavoriteListings() {
//   try {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//       return [];
//     }

//     const favorites = await prisma.listing.findMany({
//       where: {
//         id: {
//           in: [...(currentUser.favoriteIds || [])],
//         },
//       },
//     });

//     const safeFavorites = favorites.map((favorite) => ({
//       ...favorite,
//       createdAt: favorite.createdAt.toString(),
//     }));

//     return safeFavorites;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

export async function addFavoriteListings(params: IParams) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  try {
    const { listingId } = params;

    const res = await prisma.favorite.create({
      data: {
        userId: currentUser.id,
        id: listingId,
      },
    });
    revalidatePath("/favorites");
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
interface IFParams {
  favoriteId?: string;
}
export async function deleteFavoriteListing(params: IFParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  try {
    const { favoriteId } = params;
    const res = await prisma.favorite.delete({
      where: {
        userId: currentUser.id,
        id: favoriteId,
      },
    });
    revalidatePath("/favorites");
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
