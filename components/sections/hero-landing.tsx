"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function HeroLanding() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <h1 className="mb-4 text-6xl font-bold">
          It&apos;s time to
          <br />
          <span className="text-7xl">Discover</span>
        </h1>
        <p className="mb-12 text-xl">
          Find and book great experiences in Nepal
        </p>

        {/* Search Form */}
        <div className="mx-auto max-w-4xl rounded-lg p-4 backdrop-blur-sm">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Anywhere in Nepal"
                className="w-full"
              />
            </div>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {endDate ? format(endDate, "PPP") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button className="bg-purple-500 px-8 hover:bg-purple-600">
                <Search className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
