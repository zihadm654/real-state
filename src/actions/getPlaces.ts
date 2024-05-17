"use server";

import { currentUser } from "@/lib/auth";

export async function getPlaces() {
  const user = await currentUser();
}
export default async function getPlace(id: string) {
  const user = await currentUser();
}
