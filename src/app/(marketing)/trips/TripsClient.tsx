"use client";

// import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteReservation } from "@/actions/getReservations";
import { SafeReservation, SafeUser } from "@/types";
import { toast } from "sonner";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface TripsClientProps {
  reservations: any[];
  currentUser?: any;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        const res = await deleteReservation({ reservationId: id });
        if (res) {
          toast.success("Reservation cancelled");
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
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
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
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
