"use client";

import { useRouter } from "next/navigation";
import { categories } from "@/content/data/listingTypes";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
const PropertyType = ["APARTMENT",
  "HOUSE",
  "VILLA",
  "UNIQUE_SPACE",
  "ECO_LODGE",
  "SMART_HOME",];

export default function Step1() {
  const router = useRouter();
  const { formData, updateFormData } = useMultistepFormContext();
  const form = useForm({
    resolver: zodResolver(
      ListingSchema.pick({ title: true, description: true, category: true,type:true }),
    ),
    defaultValues: {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type,
    },
  });

  const onSubmit = (data: Partial<TListing>) => {
    updateFormData(data);
    router.push("/dashboard/listings/add/step-two");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="your listing title" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the name of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="provide listing description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your listing in detail.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type of listing" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of listing you want to create.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type of property" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PropertyType.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of property you want to create.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>
      </Form>
    </>
  );
}
