import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";

import { infos } from "@/config/landing";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import { MapFilterItems } from "@/components/MapFilter";
import Categories from "@/components/navbar/categories";
import { BentoGrid } from "@/components/sections/bentogrid";
import { Features } from "@/components/sections/features";
import { HeroLanding } from "@/components/sections/hero-landing";
import { InfoLanding } from "@/components/sections/info-landing";
import { Powered } from "@/components/sections/powered";
import { PreviewLanding } from "@/components/sections/preview-landing";
import { Testimonials } from "@/components/sections/testimonials";

interface IProps {
  searchParams: any;
}
export default async function IndexPage({ searchParams }: IProps) {
  const listings = await getListings(searchParams);
  const user = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <>
      <ClientOnly>
        <Container>
          <div
            className="
            grid
            grid-cols-1 
            gap-8 
            pt-24 
            sm:grid-cols-2 
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
          >
            {listings.map((listing: any) => (
              <ListingCard currentUser={user} key={listing.id} data={listing} />
            ))}
          </div>
        </Container>
      </ClientOnly>
      {/* <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} /> */}
      {/* <InfoLanding data={infos[1]} /> */}
      {/* <Features />
      <Testimonials /> */}
    </>
  );
}