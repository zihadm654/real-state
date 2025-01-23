"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { imageRemove } from "@/actions/image-remove";
// import { amenities } from "@/content/data/listingTypes";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { UploadDropzone } from "@/utility/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ListingSchema, TListing } from "@/lib/validations/listing";
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
import { amenities } from "@/content/data/listingTypes";

export default function Step3() {
  const [imageKey, setImageKey] = useState<string>("");
  const router = useRouter();

  const { formData, updateFormData } = useMultistepFormContext();
  const [image, setImage] = useState<string>(formData.image || "");
  const form = useForm({
    resolver: zodResolver(
      ListingSchema.pick({
        image: true,
        amenities: true,
        virtualTourUrl: true,
        arModelUrl: true,
      }),
    ),
    defaultValues: {
      image: formData.image,
      amenities: formData.amenities,
      virtualTourUrl: formData.virtualTourUrl,
      arModelUrl: formData.arModelUrl,
    },
  });

  const onBack = () => {
    router.push("/dashboard/listings/add/step-two");
  };

  const handleRemove = async () => {
    const res = await imageRemove(imageKey);
    if (res.status === 401) {
      setImage("");
      setImageKey("");
      toast.success("image removed successfully");
    }
  };
  const onSubmit = (data: Partial<TListing>) => {
    updateFormData(data);
    router.push("/dashboard/listings/add/step-four");
  };

  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Amenities</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the amenities.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-3 space-y-3">
                  {amenities.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="amenities"
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

          <h5>Additional Information</h5>
          <div className="flex flex-row items-center justify-start space-x-4">
            <FormField
              control={form.control}
              name="virtualTourUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="provide Virtual tour url" {...field} />
                  </FormControl>
                  <FormDescription>Provide Virtual tour url</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="arModelUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="provide ar model tour url" {...field} />
                </FormControl>
                <FormDescription>Provide Ar Model url</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Choose an Image</FormLabel>
                <FormControl>
                  <Input type="hidden" placeholder="Image" {...field} />
                </FormControl>
                {image ? (
                  <div className="relative rounded border">
                    <Image
                      src={image}
                      alt="img"
                      height={400}
                      width={400}
                      className="object-contain"
                    />
                    <Button
                      className="absolute right-0 top-0"
                      onClick={() => handleRemove()}
                      type="button"
                      size="icon"
                      variant="ghost"
                    >
                      <X />
                    </Button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    className="flex w-full flex-row gap-x-2 rounded p-4 text-green-900"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setImage(res[0].url);
                      setImageKey(res[0].key);
                      form.setValue("image", res[0].url);
                      toast.success("Upload Completed" + res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                )}
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
