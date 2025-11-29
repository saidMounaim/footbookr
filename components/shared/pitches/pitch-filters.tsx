"use client";

import { format } from "date-fns";
import { CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface PitchFiltersProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
}

export default function PitchFilters({
  date,
  onDateChange,
  filterType,
  onFilterTypeChange,
}: PitchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto bg-zinc-900/50 p-2 rounded-xl border border-white/5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full sm:w-[200px] justify-start text-left font-normal bg-zinc-950 border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-emerald-500" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-zinc-900 border-white/10 text-white"
          align="end"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            className="bg-zinc-950 text-white"
            classNames={{
              day_selected:
                "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 focus:bg-emerald-500",
              day_today: "bg-zinc-800 text-white",
            }}
          />
        </PopoverContent>
      </Popover>
      <Select onValueChange={onFilterTypeChange} defaultValue={filterType}>
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
