"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { imageRemove } from "@/actions/image-remove";
import { useMultistepFormContext } from "@/contexts/addListingContext";
import { UploadDropzone } from "@/utility/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sooner";

import { listingSchema, TListing } from "@/lib/validations/listing";
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

export default function Step3() {
  const [image, setImage] = useState("");
  const [imageKey, setImageKey] = useState<string>("");
  const router = useRouter();

  const { formData, updateFormData } = useMultistepFormContext();
  const form = useForm({
    resolver: zodResolver(
      listingSchema.pick({
        breakfast: true,
        wifi: true,
        parking: true,
        pool: true,
        balcony: true,
        roomService: true,
        image: true,
      }),
    ),
    defaultValues: {
      breakfast: formData.breakfast,
      wifi: formData.wifi,
      parking: formData.parking,
      pool: formData.pool,
      balcony: formData.balcony,
      roomService: formData.roomService,
      image: formData.image,
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
          <div className="grid grid-cols-2 space-y-4">
            <FormField
              control={form.control}
              name="wifi"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Wifi</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breakfast"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Breakfast</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parking"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Parking</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomService"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Room Service</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pool"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Pool</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balcony"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Balcony</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    className="flex w-full flex-row gap-x-2 rounded bg-green-100 p-4 text-green-900"
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
