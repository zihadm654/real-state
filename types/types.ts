export interface FormErrors {
  [key: string]: string | undefined;
}

export enum AddDealRoutes {
  PRODUCT_INFO = "/dashboard/listings/add/step-one",
  COUPON_DETAILS = "/dashboard/listings/add/step-two",
  CONTACT_INFO = "/dashboard/listings/add/step-three",
  REVIEW_DEAL = "/dashboard/listings/add/listing",
}
