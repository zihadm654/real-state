import { TListing, TPlaces } from "@/utils/schema";

export type User = {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string | null;
    isSeller: boolean | null;
    isEmailConfirmed: boolean | null;
    isPhoneNumberConfirmed: boolean | null;
    createdAt: string;
    updatedAt: string;
    name?: string;
  };
};
export interface safeListings extends TListing {
  id: string;
  isActive: boolean;
  isRetired: boolean;
  sellerId: number;
}

export type safePlaces = Omit<
  TPlaces,
  "id" | "rating" | "creadtedAt" | "_count" | "rating" | "images"
> & {
  id: number;
  createdAt: string;
  rating: number;
  _count: object;
  images: object;
};

export type StepListItem = {
  id: string;
  label: string;
  name: string;
  description: string;
  fields?: string[];
};

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableFilterOption<TData> {
  id?: string;
  label: string;
  value: keyof TData | string;
  items: Option[];
  isMulti?: boolean;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}
