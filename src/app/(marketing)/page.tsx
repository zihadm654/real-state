import { infos } from "@/config/landing";
import { MapFilterItems } from "@/components/MapFilter";
import { BentoGrid } from "@/components/sections/bentogrid";
import { CaegoryShowcase } from "@/components/sections/category-showcase";
import { Features } from "@/components/sections/features";
import { HeroLanding } from "@/components/sections/hero-landing";
import { InfoLanding } from "@/components/sections/info-landing";
import { Powered } from "@/components/sections/powered";
import { PreviewLanding } from "@/components/sections/preview-landing";
import { Testimonials } from "@/components/sections/testimonials";

export default async function IndexPage() {
  return (
    <>
      <MapFilterItems />
      <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      {/* <InfoLanding data={infos[1]} /> */}
      <Features />
      <Testimonials />
    </>
  );
}
