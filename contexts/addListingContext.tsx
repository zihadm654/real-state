"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { TListing } from "@/lib/validations/listing";

interface MultistepFormContextType {
  formData: TListing;
  updateFormData: (data: Partial<TListing>) => void;
  clearFormData: () => void;
}

const MultistepFormContext = createContext<
  MultistepFormContextType | undefined
>(undefined);

const STORAGE_KEY = "multistep_form_data";

export default function MultistepFormContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  //intial listing value
  const initialFormData: TListing = {
    title: "",
    description: "",
    image: "",
    category: "",
    locationData: {
      lat: 0,
      lng: 0,
      country: "",
      city: "",
      address: "",
      state: "",
      zipCode: "",
    },
    roomCount: 0,
    guestCount: 0,
    bedroomCount: 0,
    bathroomCount: 0,
    price: 0,
    type: "APARTMENT",
    status: "ACTIVE",
    amenities: [],
    ecoFriendly: false,
    greenCertified: false,
    waterEfficiency: 0,
    wasteManagement: false,
    energyRating: 0,
    carbonFootprint: 0,
    badge: [],
  };

  const [formData, setFormData] = useState<TListing>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialFormData;
  });

  const updateFormData = (data: Partial<TListing>) => {
    const updatedData = { ...formData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    setFormData(updatedData);
  };

  const clearFormData = () => {
    setFormData(initialFormData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <MultistepFormContext.Provider
      value={{ formData, updateFormData, clearFormData }}
    >
      {children}
    </MultistepFormContext.Provider>
  );
}

export function useMultistepFormContext() {
  const context = useContext(MultistepFormContext);
  if (context === undefined) {
    throw new Error(
      "useMultistepFormContext must be used within a MultistepFormContextProvider",
    );
  }
  return context;
}
