import React from "react";
import { Metadata } from "next";
import getCurrentUser from "@/actions/getCurrentUser";

import MultiForm from "@/components/listings/MultiForm";

export const metadata: Metadata = {
  title: "Listing",
  description: "All the listings are shown in dashboard listings pages",
};

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="listing__page">
      <MultiForm />
    </div>
  );
};

export default ListingPage;
