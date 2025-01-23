import { useEffect, useState } from "react";
import { useMultistepFormContext } from "@/contexts/addListingContext";

import { useDebounce } from "./use-debounce";

interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    country: string;
    city: string;
    road?: string;
    house_number?: string;
  };
}
export function useLocationSearch() {
  const { formData, updateFormData } = useMultistepFormContext();
  const [search, setSearch] = useState(formData.locationData?.address || "");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearch) return setSuggestions([]);

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedSearch)}&addressdetails=1`,
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  return { search, setSearch, suggestions, isLoading };
}
