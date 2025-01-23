"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { badges } from "@/content/data/listingTypes";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ListingSchema, TListing } from "@/lib/validations/listing";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

// const smartFeatures = [
//   { id: "THERMOSTAT", name: "Smart Thermostat" },
//   { id: "LOCK", name: "Smart Lock" },
//   { id: "LIGHTING", name: "Smart Lighting" },
//   { id: "SECURITY", name: "Security System" },
//   { id: "ENTERTAINMENT", name: "Entertainment System" },
//   { id: "APPLIANCE", name: "Smart Appliances" },
// ];

const sustainabilityFeatures = [
  { id: "solarPowered", name: "Solar Powered" },
  { id: "wasteManagement", name: "Waste Management" },
  { id: "greenCertified", name: "Green Certified" },
];

export default function StepFourPage() {
  const router = useRouter();
  const { formData, updateFormData } = useMultistepFormContext();
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/DynamicMap"), {
        ssr: false,
        loading: () => (
          <div className="h-[50vh] w-full animate-pulse bg-gray-200" />
        ),
      }),
    [formData.locationData],
  );

  const form = useForm<TListing>({
    resolver: zodResolver(
      ListingSchema.pick({
        locationData: true,
        energyRating: true,
        ecoFriendly: true,
        waterEfficiency: true,
        wasteManagement: true,
        greenCertified: true,
        carbonFootprint: true,
        badge: true,
      }),
    ),
    defaultValues: {
      locationData: formData.locationData,
      energyRating: formData.energyRating,
      ecoFriendly: formData.ecoFriendly,
      greenCertified: formData.greenCertified,
      carbonFootprint: formData.carbonFootprint,
      waterEfficiency: formData.waterEfficiency,
      wasteManagement: formData.wasteManagement,
      badge: formData.badge || [],
    },
  });

  const coordinates = form.watch("locationData");
  const coordinatesKey = useMemo(() => {
    return `${coordinates?.lat}-${coordinates?.lng}`;
  }, [coordinates]);

  const { search, setSearch, suggestions } = useLocationSearch();

  const handleLocationSelect = (suggestion: LocationSuggestion) => {
    const locationData = {
      lat: Number(suggestion.lat),
      lng: Number(suggestion.lon),
      country: suggestion.address.country,
      state: suggestion.address.state || "",
      city: suggestion.address.city || "",
      zipCode: suggestion.address.postcode || "",
      address: [
        suggestion.address.road,
        suggestion.address.house_number,
        suggestion.address.city,
        suggestion.address.state,
        suggestion.address.postcode,
      ]
        .filter(Boolean)
        .join(", "),
    };

    form.setValue("locationData", locationData, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setSearch(suggestion.display_name);
    updateFormData({ locationData });
  };

  const onBack = () => {
    router.push("/dashboard/listings/add/step-three");
  };

  const onSubmit = (data: Partial<TListing>) => {
    updateFormData(data);
    router.push("/dashboard/listings/add/step-five");
  };

  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="relative">
            <FormField
              control={form.control}
              name="locationData"
              render={() => (
                <FormItem>
                  <FormLabel>Search Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="p-2"
                        placeholder="Search for location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full rounded-lg border shadow-md">
                          {suggestions.map((suggestion: LocationSuggestion) => (
                            <div
                              key={suggestion.place_id}
                              className="cursor-pointer p-3 hover:bg-gray-100"
                              onClick={() => handleLocationSelect(suggestion)}
                            >
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">
                                  {suggestion.display_name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {suggestion.address.country}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="relative h-[50vh] w-full rounded-lg border">
            {coordinates && coordinates.lat && coordinates.lng ? (
              <>
                {/* <Map 
                  center={[
                    coordinates.lat, 
                    coordinates.lng 
                  ]}
                /> */}
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Select a location to display the map
              </div>
            )}
          </div>
          <FormField
            control={form.control}
            name="energyRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Energy Rating</FormLabel>
                <FormDescription>
                  Enter the property&apos;s energy rating
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    min={0}
                    max={100}
                    placeholder="Enter the property's energy rating"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ecoFriendly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is this property eco-friendly?</FormLabel>
                  <FormDescription>
                    This will display the property on the eco-friendly tab.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wasteManagement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Is this property has waterMangement system?
                  </FormLabel>
                  <FormDescription>
                    This will display the property on the water mangement tab.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="greenCertified"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is this property green-certified?</FormLabel>
                  <FormDescription>
                    This will display the property on the green-certified tab.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waterEfficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water Efficiency</FormLabel>
                <FormDescription>
                  Enter the property&apos;s water efficiency
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the property's carbon offset"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carbonFootprint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carbon Footprint</FormLabel>
                <FormDescription>
                  Enter the property&apos;s carbon footprint
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the property's carbon offset"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="badge"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Badges</FormLabel>
                  <FormDescription>
                    Select the badge you want to display in the badges.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {badges.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="badge"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    country: string;
    city?: string;
    road?: string;
    house_number?: string;
    state?: string;
    postcode?: string;
  };
}
