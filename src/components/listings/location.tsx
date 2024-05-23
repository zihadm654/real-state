"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import useCountries from "@/hooks/use-countries";

import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

type TLocation = {
  selectPosition: any;
  setPosition: any;
  form: any;
};

const Location = ({ selectPosition, setPosition, form }: TLocation) => {
  const { getAll } = useCountries();
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />,
      }),
    [selectPosition],
  );

  return (
    <div className="location">
      <h2 className="mb-10 text-3xl font-semibold tracking-tight transition-colors">
        Where is your Home located?
      </h2>
      <div className="mb-5">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                required
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getAll()?.map((item: any) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <div className="map__content">
        <Map locationValue={selectPosition} />
      </div>
    </div>
  );
};

export default Location;
