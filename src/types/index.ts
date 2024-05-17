import { User } from "@prisma/client";

import { TListing, TPlaces } from "@/lib/validations/schema";

import { Icons } from "../components/shared/icons";

// export type User = {
//   token: string;
//   user: {
//     id: number;
//     email: string;
//     firstName: string;
//     lastName: string;
//     role: string;
//     phoneNumber: string | null;
//     isSeller: boolean | null;
//     isEmailConfirmed: boolean | null;
//     isPhoneNumberConfirmed: boolean | null;
//     createdAt: string;
//     updatedAt: string;
//     name?: string;
//   };
// };
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
export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: any[];
    }
);

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
};
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};
export type SubscriptionPlan = {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd: number;
    isPaid: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
  };
