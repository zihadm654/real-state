import { Listing, Reservation, User } from "@prisma/client";

import { Icons } from "../components/shared/icons";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: Date;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: Date;
  updatedAt: Date;
  startDate?: Date;
  endDate?: Date;
  listing: SafeListing;
};

export type SafeUser = Omit<User, "createdAt" | "emailVerified"> & {
  createdAt: Date;
  updatedAt: Date;
  emailVerified: string | null;
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

// export type UserSubscriptionPlan = SubscriptionPlan &
//   Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
//     stripeCurrentPeriodEnd: number;
//     isPaid: boolean;
//     interval: "month" | "year" | null;
//     isCanceled?: boolean;
//   };
