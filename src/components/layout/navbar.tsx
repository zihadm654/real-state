"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainNavItem } from "@/types";
import type { User } from "next-auth";

import { cn } from "@/lib/utils";
import useScroll from "@/hooks/use-scroll";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "@/components/ui/button";

import Search from "../navbar/Search";
import { Icons } from "../shared/icons";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";

interface NavBarProps {
  user: any;
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  user,
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const signInModal = useSigninModal();
  const router = useRouter();
  return (
    <>
      <header
        className={`sticky top-0 z-40 flex w-full flex-col justify-center bg-background/60 align-middle backdrop-blur-xl transition-all ${
          scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
        }`}
      >
        <div className="container flex h-[60px] items-center justify-between py-4">
          <MainNav items={items}>{children}</MainNav>
          <Search />
          <div className="flex items-center space-x-3">
            {rightElements}

            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <>
                <Button
                  className="gap-2 px-4"
                  variant="default"
                  size="sm"
                  rounded="full"
                  onClick={() => router.push("/login")}
                >
                  <span>Log In</span>
                  <Icons.arrowRight className="size-4" />
                </Button>
                <Button
                  className="gap-2 px-4"
                  variant="default"
                  size="sm"
                  rounded="full"
                  onClick={signInModal.onOpen}
                >
                  <span>Sign In</span>
                  <Icons.arrowRight className="size-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
