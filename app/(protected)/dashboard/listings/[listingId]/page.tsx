import React from "react";
import { redirect } from "next/navigation";
import { getListingById } from "@/actions/listings";

import { getCurrentUser } from "@/lib/session";

// import HotelForm from "../../components/Form";

interface HotelProps {
  params: {
    listingId: string;
  };
}
const page = async ({ params }: HotelProps) => {
  const hotel = await getListingById(params.listingId);
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) redirect("/auth/login");
  if (hotel && hotel.userId !== currentUser.id)
    return <div>Access denied...</div>;
  return <div>{/* <HotelForm hotel={hotel} userId={currentUser.id} /> */}</div>;
};

export default page;
