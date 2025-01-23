import { getListingById } from "@/actions/listings";

import ListingDetails from "./ListingDetails";

const ListingDetail = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const listingId = (await params).listingId;
  const listing = await getListingById(listingId);
  if (listing.error || !listing.data) return <div>Listing not found</div>;
  // const reservations = await getReservationsByListingId(params.listingId);
  return <ListingDetails listing={listing.data} />;
};

export default ListingDetail;
