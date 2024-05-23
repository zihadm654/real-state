"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { Listing, Reservation, User } from "@prisma/client";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { toast } from "sonner";

import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";
import { categories } from "@/components/navbar/categories";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: any[];
  listing: any & {
    user: User;
  };
  currentUser?: any | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>();

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      // return loginModal.onOpen();
    }
    setIsLoading(true);

    // axios
    //   .post("/api/reservations", {
    //     totalPrice,
    //     startDate: dateRange.startDate,
    //     endDate: dateRange.endDate,
    //     listingId: listing?.id,
    //   })
    //   .then(() => {
    //     toast.success("Listing reserved!");
    //     setDateRange(initialDateRange);
    //     router.push("/trips");
    //   })
    //   .catch(() => {
    //     toast.error("Something went wrong.");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, [totalPrice, dateRange, listing?.id, router, currentUser]);

  // useEffect(() => {
  //   if (dateRange.startDate && dateRange.endDate) {
  //     const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

  //     if (dayCount && listing.price) {
  //       setTotalPrice(dayCount * listing.price);
  //     } else {
  //       setTotalPrice(listing.price);
  //     }
  //   }
  // }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          mx-auto 
          max-w-screen-lg
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.image}
            locationValue={listing.location}
            id={listing.id}
            // currentUser={currentUser}
          />
          <div
            className="
              mt-6 
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.rooms}
              guestCount={listing.guests}
              bathroomCount={listing.bathrooms}
              locationValue={listing.location}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              {/* <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
