import { useEffect, useState } from "react";

import { useDebounce } from "./use-debounce";

export function useLocation() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 51.505,
    lng: -0.09,
  });
  const [location, setLocation] = useState("");
  const debouncedLocation = useDebounce(location, 1000);

  useEffect(() => {
    const getCoordinates = async () => {
      if (!debouncedLocation) return;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedLocation)}`,
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    getCoordinates();
  }, [debouncedLocation]);

  return { coordinates, setLocation, debouncedLocation };
}
