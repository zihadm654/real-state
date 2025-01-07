import Link from "next/link";

import { features } from "@/config/landing";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features() {
  return (
    <section>
      <div className="pb-6 pt-28">
        <MaxWidthWrapper>
          <HeaderSection
            label="Browse by Category"
            title="Discover all categories."
            subtitle="Harum quae dolore inventore repudiandae? orrupti aut temporibus
          ariatur."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = Icons[feature.icon || "nextjs"];
              return (
                <div
                  className="group relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
                  key={feature.title}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-purple-500/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                  />
                  <div className="relative">
                    <div className="relative flex size-12 rounded-2xl border border-border shadow-sm *:relative *:m-auto *:size-6">
                      <Icon />
                    </div>

                    <p className="mt-6 pb-6 text-muted-foreground">
                      {feature.description}
                    </p>

                    <div className="-mb-5 flex gap-3 border-t border-muted py-4 md:-mb-7">
                      <Button
                        variant="secondary"
                        size="sm"
                        rounded="xl"
                        className="px-4"
                      >
                        <Link href="/" className="flex items-center gap-2">
                          <span>Visit the site</span>
                          <Icons.arrowUpRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
{
  /* <div className="container relative z-10 mx-auto px-4 pb-24">
  <h2 className="mb-8 text-3xl font-bold text-white"></h2>
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
    {[
      "Trekking",
      "Cultural Tours",
      "Adventure Sports",
      "Wildlife Safari",
      "Meditation",
      "Photography",
    ].map((category) => (
      <div
        key={category}
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: "url('/placeholder.svg?height=200&width=200')",
          }}
        />
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-medium text-white">{category}</span>
        </div>
      </div>
    ))}
  </div>
</div>; */
}
