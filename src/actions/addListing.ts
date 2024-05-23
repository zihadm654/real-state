"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Listing } from "@prisma/client";

import { prisma } from "@/lib/db";
import { ListingSchema } from "@/lib/validations/schema";

import getCurrentUser from "./getCurrentUser";

export async function createListing(data: Listing) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  const result = ListingSchema.safeParse(data);

  try {
    await prisma.listing.create({
      data: {
        ...data,
        userId: currentUser.id,
      },
    });
  } catch (error) {
    return "server error";
  }
  revalidatePath("/");
}
