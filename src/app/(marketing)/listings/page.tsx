import React, { Suspense } from "react";
import { Metadata } from "next";
import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { getListingById } from "@/actions/getListings";

import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import MultiForm from "@/components/listings/MultiForm";

export const metadata: Metadata = {
  title: "Listing",
  description: "All the listings are shown in dashboard listings pages",
};

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  // console.log("params", params);
  const listing = await getListings({ userId: currentUser?.id! });
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <section className="container mx-auto mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      <Suspense fallback={<div>loading...</div>}>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listing?.map((item) => (
            <ListingCard
              key={item.id}
              data={item}
              // image={item?.image}
              // listingId={item.id}
              // price={item.price}
              // description={item.description}
              // location={item.location}
              // userId={currentUser?.id}
              // pathName="/my-homes"
              // favoriteIds={item?.favoriteIds[0]?.id}
              // isInFavoriteList={item.Favorite.length > 0 ? true : false}
            />
          ))}
        </div>
      </Suspense>
    </section>
  );
};

export default ListingPage;
