"use server";

import { auth } from "@/auth";

export default async function getCurrentUser() {
  try {
    const session = await auth();
    console.log(session?.user, "currentuser");
    if (!session?.user) {
      return null;
    }

    return session?.user;
  } catch (error: any) {
    return null;
  }
}
