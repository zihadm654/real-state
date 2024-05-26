"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Search } from "lucide-react";
import { useFormStatus } from "react-dom";

import useCountries from "@/hooks/use-countries";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Counter } from "../Counter";
import { Skeleton } from "../ui/skeleton";

export default function SearchModalCompnent() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const { getAll } = useCountries();
  const { pending } = useFormStatus();
  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      return (
        <>
          {pending ? (
            <Button disabled size="lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" size="lg">
              Next
            </Button>
          )}
        </>
      );
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center rounded-full border px-5 py-2">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>

          <Search className="h-8 w-8 rounded-full bg-primary p-1 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col gap-4">
          <input type="hidden" name="country" value={location} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Pleae Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Select
                required
                onValueChange={(value) => setLocation(value)}
                value={location}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAll().map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label} / {item.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap location={location} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Pleae Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline">Guests</h3>
                      <p className="text-sm text-muted-foreground">
                        How many guests do you want?
                      </p>
                    </div>

                    <Counter name="guest" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline">Rooms</h3>
                      <p className="text-sm text-muted-foreground">
                        How many rooms do you have?
                      </p>
                    </div>

                    <Counter name="room" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline">Bathrooms</h3>
                      <p className="text-sm text-muted-foreground">
                        How many bathrooms do you have?
                      </p>
                    </div>

                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function HomeMap({ location }: { location: string }) {
  const LazyMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return <LazyMap locationValue={location} />;
}
