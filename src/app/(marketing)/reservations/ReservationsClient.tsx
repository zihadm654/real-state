"use client";

// import { toast } from "react-hot-toast";
// import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteReservation } from "@/actions/getReservations";
import { SafeReservation, SafeUser } from "@/types";
import { User } from "@prisma/client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: any[];
  currentUser?: any | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      deleteReservation({ reservationId: id });
      // axios.delete(`/api/reservations/${id}`)
      // .then(() => {
      //   toast.success('Reservation cancelled');
      //   router.refresh();
      // })
      // .catch(() => {
      //   toast.error('Something went wrong.')
      // })
      // .finally(() => {
      //   setDeletingId('');
      // })
    },
    [router],
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
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
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
