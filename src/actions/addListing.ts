"use server";

// import { uploadFile } from './upload';
import { ListingSchema, TListing } from "@/utils/schema";

export const addListing = async (data: TListing, token: string) => {
  try {
    // const res = await uploadFile(data.photos);
    // toast.success('photos upload success');
  } catch (error) {
    // toast.error('photos upload failed');
    console.log(error);
  }
  const userInputs = ListingSchema.parse(data);
};
