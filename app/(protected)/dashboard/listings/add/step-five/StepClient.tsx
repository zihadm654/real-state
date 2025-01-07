"use client";

import { useRouter } from "next/navigation";
import { createListing } from "@/actions/listings";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { listingSchema, TListing } from "@/lib/validations/listing";
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
    resolver: zodResolver(listingSchema),
    defaultValues: formData,
  });

  const onBack = () => {
    router.push("/dashboard/listings/add/step-four");
  };

  const onSubmit = async (data: Partial<TListing>) => {
    const finalFormData = { ...formData, ...data };
    const res = await createListing(finalFormData, user?.id);
    if (!res) {
      toast.error("something went wrong");
    }
    router.push("/dashboard/listings");
    clearFormData();
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
