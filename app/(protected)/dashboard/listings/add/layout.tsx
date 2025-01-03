"use client";

import dynamic from "next/dynamic";

const MultistepFormContextProvider = dynamic(
  () => import("@/contexts/addListingContext"),
  {
    ssr: false,
  },
);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-4">
      <MultistepFormContextProvider>{children}</MultistepFormContextProvider>
    </main>
  );
}
