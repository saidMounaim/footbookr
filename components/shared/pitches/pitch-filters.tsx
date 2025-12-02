"use client";

import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PitchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentFilter = searchParams.get("type") || "all";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      <Select
        onValueChange={handleFilterChange}
        defaultValue={currentFilter}
        value={currentFilter}
      >
        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-950 border-white/10 text-zinc-300">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-emerald-500" />
            <SelectValue placeholder="Filter by Type" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-white/10 text-white">
          <SelectItem value="all">All Pitches</SelectItem>
          <SelectItem value="5v5">5-a-side Only</SelectItem>
          <SelectItem value="7v7">7-a-side Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
