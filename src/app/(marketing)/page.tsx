import { Suspense } from "react";
import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/actions/getListings";

import { Skeleton } from "@/components/ui/skeleton";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import { MapFilterItems } from "@/components/MapFilter";

export default async function IndexPage({ searchParams }: any) {
  const user = await getCurrentUser();
  const listings = await getListings({ userId: user?.id! });

  console.log(listings, "listings");
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
            py-2
          "
          >
            <MapFilterItems />
            <Suspense key={searchParams?.filter} fallback={<Skeleton />}>
              <ShowItems searchParams={searchParams} />
            </Suspense>
          </div>
        </Container>
      </ClientOnly>
    </>
  );
}

async function ShowItems({ searchParams }: { searchParams?: IListingsParams }) {
  const currentUser = await getCurrentUser();
  const listings = await getListings({
    ...searchParams,
    userId: currentUser?.id,
  });
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <>
      <div className="lg:gird-cols-4 mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {listings?.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </>
  );
}
