"use client";

import dynamic from "next/dynamic";
import { User } from "next-auth";
import { IconType } from "react-icons";

import useCountries from "@/hooks/use-countries";
import ListingCategory from "@/components/listings/listingCategory";

import ClientOnly from "../ClientOnly";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.value;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-2 
            text-xl
            font-semibold
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <ClientOnly>
        <Map locationValue={coordinates!} />
      </ClientOnly>
    </div>
  );
};

export default ListingInfo;
