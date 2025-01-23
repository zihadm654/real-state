// import { redirect } from "next/navigation";
import { getListingById } from "@/actions/listings";

import { getCurrentUser } from "@/lib/session";

// import HotelForm from "../../components/Form";
const page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const listingId = (await params).listingId;
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();
  // if (!currentUser?.id) redirect("/auth/login");
  // if (hotel && hotel.userId !== currentUser.id)
  return <div>Access denied...</div>;
  return <div>{/* <HotelForm hotel={hotel} userId={currentUser.id} /> */}</div>;
};

export default page;
