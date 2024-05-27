"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { th } from "date-fns/locale";

import { prisma } from "@/lib/db";

import getCurrentUser from "./getCurrentUser";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing?.createdAt,
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

interface IAParams {
  listingId?: string;
  startDate?: Date;
  endDate?: Date;
  totalPrice: number;
}
export async function addReservation(data: IAParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  try {
    const { listingId, startDate, endDate, totalPrice } = data;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return;
    }

    const res = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
    revalidatePath("/trips");
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

interface IDParams {
  reservationId: string;
}
export async function deleteReservation(params: IDParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  try {
    const { reservationId } = params;

    const res = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    revalidatePath("/trips");
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
