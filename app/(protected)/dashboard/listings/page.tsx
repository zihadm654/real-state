import { getUserListings } from "@/actions/listings";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { columns } from "@/components/dashboard/data-table/columns";
import { DataTable } from "@/components/dashboard/data-table/data-table";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Listings - Advanture",
  description: "creation of hotel and rooms",
});

export default async function ChartsPage() {
  const currentUser = await getCurrentUser();
  const listings = await getUserListings(currentUser?.id!);
  console.log(listings, "listings");
  if (!listings) return <div>hotels not found</div>;
  if ("error" in listings) {
    return <div>Error loading listings: {String(listings.error)}</div>;
  }
  return (
    <>
      <DashboardHeader heading="Listings" text="List of listings." />
      {listings && <DataTable columns={columns} data={listings.data} />}
    </>
  );
}
