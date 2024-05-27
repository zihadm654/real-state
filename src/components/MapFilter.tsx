"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { categories } from "@/components/navbar/categories";

import { CategoryBoxProps } from "./categoryBox";

export function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("category");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="no-scrollbar mt-5 flex w-full gap-x-10 overflow-x-scroll">
      {categories?.map((item: CategoryBoxProps) => (
        <Link
          key={item.label}
          href={pathname + "?" + createQueryString("category", item.label)}
          className={cn(
            search === item.label
              ? "flex-shrink-0 border-b-2 border-black pb-2"
              : "flex-shrink-0 opacity-70",
            "flex flex-col items-center gap-y-3",
          )}
        >
          <div className="relative">{<item.icon className="size-8" />}</div>
          <p className="text-xs font-medium">{item.label}</p>
        </Link>
      ))}
    </div>
  );
}
