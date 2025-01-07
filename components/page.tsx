"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarIcon, Contact2, Mountain, Search, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function BlockPage() {
  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}

        {/* Featured Destinations */}

        {/* Categories Section */}
      </div>
    </div>
  );
}
