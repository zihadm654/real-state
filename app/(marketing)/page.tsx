import { Suspense } from "react";
import { getListings } from "@/actions/listings";

import { infos } from "@/config/landing";
import BestSelling from "@/components/home/ListingCard";
import { BlockPage } from "@/components/page";
import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import { SkeletonSection } from "@/components/shared/section-skeleton";

interface IProps {
  searchParams: {
    title?: string;
    location?: string;
  };
}
export const dynamic = "force-dynamic";

export default async function IndexPage({ searchParams }: IProps) {
  const listings = await getListings(searchParams);
  if (!listings) return <div>listings not found</div>;
  return (
    <>
      <HeroLanding />
      <Suspense fallback={<SkeletonSection />}>
        <BestSelling listings={listings} />
      </Suspense>
      <Features />
      {/* <BlockPage /> */}
      {/* 
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      <Testimonials /> */}
    </>
  );
}
