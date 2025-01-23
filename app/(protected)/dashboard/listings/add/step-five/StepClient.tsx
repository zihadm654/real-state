"use client";

import { useRouter } from "next/navigation";
import { createListing } from "@/actions/listings";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ListingSchema, TListing } from "@/lib/validations/listing";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function Step5({ user }: any) {
  const router = useRouter();
  const { formData, clearFormData } = useMultistepFormContext();
  const form = useForm({
    resolver: zodResolver(ListingSchema),
    defaultValues: formData,
  });

  const onBack = () => {
    router.push("/dashboard/listings/add/step-four");
  };

  const onSubmit = async (data: Partial<TListing>) => {
    try {
      const finalFormData = { ...formData, ...data };
      console.log('Form data before filtering:', finalFormData);
      
      // Filter out empty or undefined fields
      const filteredFormData = Object.fromEntries(
        Object.entries(finalFormData).filter(
          ([_, value]) =>
            value !== undefined &&
            value !== null &&
            value !== "" &&
            (!Array.isArray(value) || value.length > 0),
        ),
      ) as TListing;
      
      console.log('Filtered form data:', filteredFormData);
      
      // Use the filtered form data as action input
      const listingResult = await createListing(filteredFormData, user?.id);
      console.log('Listing creation result:', listingResult);
      
      if (!listingResult.success) {
        toast.error(listingResult.error || "Something went wrong");
        console.error('Creation error details:', listingResult.details);
        return;
      }
      
      toast.success("Listing created successfully");
      router.push("/dashboard/listings");
      clearFormData();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-8"
        >
          {!form.formState.isValid && (
            <div className="text-red-500">
              <ul>
                {Object.entries(form.formState.errors).map(([field, error]) => (
                  <li key={field}>
                    {field}: {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
