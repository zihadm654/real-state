"use server";

import { UserRole } from "@prisma/client";

import { CurrentRole } from "@/hooks/use-current-role";

export const admin = async () => {
  const role = await CurrentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
