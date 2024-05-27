"use client";

// import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteListingById } from "@/actions/getListings";
import { SafeListing, SafeUser } from "@/types";
import { toast } from "sonner";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface PropertiesClientProps {
  listings: any[];
  currentUser?: any | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        const res = await deleteListingById({ listingId: id });
        if (res) {
          toast.success("Listing deleted successfully");
          router.refresh();
        }
      } catch (error) {
        toast.error("error.message");
      }
    },
    [router],
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          gap-8 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            disabled={deletingId === listing.id}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onDelete}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
