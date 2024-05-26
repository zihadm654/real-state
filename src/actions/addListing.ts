"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SafeListing } from "@/types";
import { Listing } from "@prisma/client";

import { prisma } from "@/lib/db";
import { ListingSchema } from "@/lib/validations/schema";

import getCurrentUser from "./getCurrentUser";

export async function createListing(data: SafeListing) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/login");
  }
  const result = ListingSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.success) {
    try {
      await prisma.listing.create({
        data: {
          ...result.data,
          userId: currentUser.id,
        },
      });
      return { success: "listing has been created" };
    } catch (error) {
      return "server error";
    }
    // return { data: result.data };
  }

  // TODO: perform desired action / mutation

  if (result.error) {
    return { error: result.error.format() };
  }
  revalidatePath("/");
}
