"use client";

import { Listing } from "@prisma/client";
import { MapPin } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { AmmenityItem } from "@/components/home/ListingCard";
import BlurImage from "@/components/shared/blur-image";

const ListingDetails = ({ listing }: { listing: Listing }) => {
  return (
    <div className="container">
      <BlurImage
        src={listing.image}
        alt={listing?.title}
        height={400}
        width={300}
        className="w-full object-cover"
      />
      <div className="mt-5">
        <h2 className="text-2xl font-bold">{listing.title}</h2>
        <div className="mt-3 font-semibold">
          <AmmenityItem>
            <MapPin className="size-4" />
            {/* {country?.name}, {listing.city} */}
          </AmmenityItem>
          {/* <p>{listing.location}</p> */}
        </div>
        <div className="mt-5">
          <h3 className="pb-3 text-xl font-semibold">About this listing</h3>
          <p>{listing.description}</p>
        </div>
        <div className="mt-5">
          <h3 className="pb-3 text-xl font-semibold">Popular Amenitites</h3>
          <div className="grid grid-cols-2 gap-3 py-2">
            {/* {listing.pool && (
              <AmmenityItem>
                <Waves className="size-4" /> Pool
              </AmmenityItem>
            )}
            {listing.gym && (
              <AmmenityItem>
                <Dumbbell className="size-4" /> Gym
              </AmmenityItem>
            )}
            {listing.laundry && (
              <AmmenityItem>
                <WashingMachine className="size-4" /> Laundry
              </AmmenityItem>
            )}
            {listing.parking && (
              <AmmenityItem>
                <ParkingCircle className="size-4" /> Parking
              </AmmenityItem>
            )}
            {listing.bar && (
              <AmmenityItem>
                <GlassWater className="size-4" /> Bar
              </AmmenityItem>
            )}
            {listing.bikeRental && (
              <AmmenityItem>
                <Bike className="size-4" /> Bike Rental
              </AmmenityItem>
            )}
            {listing.coffeeShop && (
              <AmmenityItem>
                <Coffee className="size-4" /> Coffee Shop
              </AmmenityItem>
            )} */}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default ListingDetails;
