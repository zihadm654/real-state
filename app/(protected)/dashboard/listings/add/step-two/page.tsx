"use client";

import { useRouter } from "next/navigation";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { listingSchema, TListing } from "@/lib/validations/listing";
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
      listingSchema.pick({
        price: true,
        room: true,
        breakfastPrice: true,
        bed: true,
        guest: true,
        bathroom: true,
      }),
    ),
    defaultValues: {
      price: formData.price,
      breakfastPrice: formData.breakfastPrice,
      bed: formData.bed,
      room: formData.room,
      guest: formData.guest,
      bathroom: formData.bathroom,
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
            name="breakfastPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breakfast Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="price your breakfast price"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the breakfast price of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bed</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="bed count" {...field} />
                </FormControl>
                <FormDescription>
                  Enter bed count of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="room count" {...field} />
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
            name="bathroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathroom</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="bathroom count"
                    {...field}
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
            name="guest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="guest count" {...field} />
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
