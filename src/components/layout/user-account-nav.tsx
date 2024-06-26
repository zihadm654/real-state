"use client";

import Link from "next/link";
import {
  BookMarked,
  CalendarHeart,
  CreditCard,
  LandPlot,
  LayoutDashboard,
  LogOut,
  Plane,
  Plus,
  Settings,
} from "lucide-react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/user-avatar";

import { buttonVariants } from "../ui/button";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email" | "id">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user?.name || null, image: user?.image || null }}
          className="size-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {user?.name && <p className="font-medium">{user?.name}</p>}
                {user?.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center space-x-2.5">
                <LayoutDashboard className="size-4" />
                <p className="text-sm">Dashboard</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/trips" className="flex items-center space-x-2.5">
                <Plane className="size-4" />
                <p className="text-sm">My Trips</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/favorites" className="flex items-center space-x-2.5">
                <CalendarHeart className="size-4" />
                <p className="text-sm">My Favoirates</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/reservations"
                className="flex items-center space-x-2.5"
              >
                <BookMarked className="size-4" />
                <p className="text-sm">My Reservations</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/properties"
                className="flex items-center space-x-2.5"
              >
                <LandPlot className="size-4" />
                <p className="text-sm">My Properties</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-2.5"
              >
                <Settings className="size-4" />
                <p className="text-sm">Settings</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault();
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                });
              }}
            >
              <div className="flex items-center space-x-2.5">
                <LogOut className="size-4" />
                <p className="text-sm">Log out </p>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {!user ? (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    rounded: "full",
                  }),
                  "px-4",
                )}
              >
                Login
              </Link>
            ) : null}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
