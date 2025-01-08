"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Listing } from "@prisma/client";
import {
  Bike,
  Coffee,
  Dumbbell,
  GlassWater,
  MapPin,
  ParkingCircle,
  Star,
  WashingMachine,
  Waves,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import BlurImage from "@/components/shared/blur-image";

import { Badge } from "../ui/badge";

const BestSelling = ({ listings }: any) => {
  return (
    <div className="container relative z-10 mx-auto py-12">
      <h2 className="mb-8 text-3xl font-bold">Popular Listing</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {listings &&
          listings?.map((listing: any) => (
            <ListingCard listing={listing} key={listing.id} />
          ))}
      </div>
    </div>
  );
};

export default BestSelling;

export const ListingCard = ({ listing }: { listing: Listing }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/listings/" + listing.id)}
      className="group cursor-pointer"
    >
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${listing.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="mb-1 text-xl font-bold ">{listing.title}</h3>
          <p className="text-sm">{listing.location}</p>
        </div>
        {/* <Badge className="absolute right-4 top-4 bg-white/90 text-black hover:bg-white">
                {destination.difficulty}
              </Badge> */}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          {/* <span className="font-medium">{destination.rating}</span>
                <span>({destination.reviews})</span> */}
        </div>
        <div>
          <span className="font-bold">{listing.price}</span>
          {/* <span> / {destination.duration}</span> */}
        </div>
      </div>
    </div>
  );
};

export const AmmenityItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};
