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
  const initialFormData: TListing = {
    title: "",
    description: "",
    image: "",
    category: "",
    location: "",
    price: 0,
    room: 0,
    guest: 0,
    bed: 0,
    bathroom: 0,
    breakfastPrice: 0,
    breakfast: false,
    roomService: false,
    parking: false,
    pool: false,
    wifi: false,
    balcony: false,
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
