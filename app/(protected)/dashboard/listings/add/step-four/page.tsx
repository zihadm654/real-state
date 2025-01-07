"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getLocation } from "@/actions/get-location";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { listingSchema, TListing } from "@/lib/validations/listing";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
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
import { CardSkeleton } from "@/components/shared/card-skeleton";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Step3() {
  const router = useRouter();

  const { formData, updateFormData } = useMultistepFormContext();
  const form = useForm({
    resolver: zodResolver(
      listingSchema.pick({
        location: true,
      }),
    ),
    defaultValues: {
      location: formData.location,
    },
  });

  const [location, setLocation] = useState("");
  const debouncedLocation = useDebounce(location);

  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 51.505,
    lng: -0.09,
  }); // Default to London

  useEffect(() => {
    const getCoordinates = async () => {
      const data = await getLocation(debouncedLocation);
      if (data && data.length > 0) {
        setCoordinates({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      }
    };
    getCoordinates();
  }, [debouncedLocation]);

  const onBack = () => {
    router.push("/dashboard/listings/add/step-three");
  };
  const onSubmit = (data: Partial<TListing>) => {
    updateFormData(data);
    router.push("/dashboard/listings/add/step-five");
  };
  const LazyMap = dynamic(() => import("@/components/dashboard/Map"), {
    ssr: false,
    loading: () => <CardSkeleton />,
  });
  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your location"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setLocation(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the name of your listing location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LazyMap coordinates={coordinates} />
          </div>
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
