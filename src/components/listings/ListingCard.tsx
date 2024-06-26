"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { User } from "@prisma/client";
import { format } from "date-fns";

import useCountries from "@/hooks/use-countries";
import HeartButton from "@/components/listings/HeartButton";

// import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { Button } from "../ui/button";

interface ListingCardProps {
  data: any;
  reservation?: any;
  disabled?: boolean;
  currentUser?: any | null;
  actionId?: string;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  currentUser,
  onAction,
  actionId,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.location);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId!);
    },
    [disabled, onAction, actionId],
  );
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div
          className="
            relative 
            aspect-square 
            w-full 
            overflow-hidden 
            rounded-xl
          "
        >
          {data.image && (
            <Image
              fill
              className="
              h-full 
              w-full 
              object-cover 
              transition 
              group-hover:scale-110
            "
              src={data.image}
              alt="Listing"
            />
          )}
          <div
            className="
            absolute
            right-3
            top-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && (
          <Button disabled={disabled} onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
