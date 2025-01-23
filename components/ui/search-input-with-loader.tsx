"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Mic, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function InputDemo() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inputValue]);

  return (
    <div className="w-[300px] space-y-2">
      <Label htmlFor="input-27">Search input with loader</Label>
      <div className="relative">
        <Input
          id="input-27"
          className="peer pe-9 ps-9"
          placeholder="Search..."
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="presentation"
            />
          ) : (
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Press to speak"
          type="submit"
        >
          <Mic size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export { InputDemo };
