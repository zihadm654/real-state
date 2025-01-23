"use client";

import { useRouter } from "next/navigation";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ListingSchema, TListing } from "@/lib/validations/listing";
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

export default function Step2() {
  const router = useRouter();
  const { formData, updateFormData } = useMultistepFormContext();
  const form = useForm({
    resolver: zodResolver(
      ListingSchema.pick({
        price: true,
        roomCount: true,
        bedroomCount: true,
        guestCount: true,
        bathroomCount: true,
      }),
    ),
    defaultValues: {
      price: formData.price,
      bedroomCount: formData.bedroomCount,
      roomCount: formData.roomCount,
      guestCount: formData.guestCount,
      bathroomCount: formData.bathroomCount,
    },
  });

  const onBack = () => {
    router.push("/dashboard/listings/add/step-one");
  };

  const onSubmit = (data: Partial<TListing>) => {
    updateFormData(data);
    router.push("/dashboard/listings/add/step-three");
  };

  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    type="number"
                    placeholder="price your listing"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the price of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedroomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BedRoom Count</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={field.value}
                    type="number"
                    placeholder="bedroom count"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter Bedroom count of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="room count"
                    {...field}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Enter room count of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathroom</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="bathroom count"
                    {...field}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Enter bathroom count of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="guest count"
                    {...field}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Enter guest count of your listing.
                </FormDescription>
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
