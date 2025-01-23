import { getListings } from "@/actions/listings";

import { ListingCard } from "@/components/home/ListingCard";

interface IProps {
  searchParams: Promise<{
    title?: string;
    location?: string;
  }>;
}
const Listings = async ({
  params,
}: {
  params: Promise<{
    searchParams: {
      title?: string;
      locationData?: {
        country?: string;
        city?: string;
        state?: string;
      };
    };
  }>;
}) => {
  const searchParams = (await params).searchParams;
  const listings = await getListings(searchParams);
  if (!listings) return <div>listings not found</div>;
  return (
    <div className="container relative z-10 mx-auto py-6">
      <h2 className="mb-8 text-3xl font-bold">Listings</h2>
      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 lg:grid-cols-4">
        {listings.data?.map((listing: any) => (
          <ListingCard listing={listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
};

export default Listings;
