"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Users } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

export default function Hero() {
  const [date, setDate] = useState<Date>();
  const [pitchType, setPitchType] = useState<string>("");

  const handleCheckAvailability = () => {
    if (!date || !pitchType) {
      toast.error("Please select a date and pitch type");
      return;
    }
  };

  return (
    <section className="relative px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 text-center space-y-8">
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 py-1.5 px-4 rounded-full text-xs font-semibold"
        >
          <span className="mr-2 relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          3 Pitches Available Now
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          The best turf in town. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            Book your match.
          </span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Welcome to the official booking site for{" "}
          <strong>FootBookr Arena</strong>. We host 3 pro-grade 5-a-side fields
          and 2 regulation 7-a-side fields.
        </p>

        <Card className="mx-auto max-w-3xl bg-zinc-900/80 border-white/10 backdrop-blur-md shadow-2xl overflow-visible z-20 p-0">
          <CardContent className="p-3 flex flex-col md:flex-row gap-3">
            <div className="flex-1 h-12">
              <Select onValueChange={setPitchType}>
                <SelectTrigger className="py-[22px] w-full bg-zinc-950/50 border-white/10 text-zinc-300 focus:ring-emerald-500/50">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-500" />
                    <SelectValue placeholder="Select Pitch Type" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white w-full">
                  <SelectItem value="5v5">
                    <span className="font-bold ">5-a-side</span>
                    <span className="text-zinc-500 ml-2">(3 Pitches)</span>
                  </SelectItem>
                  <SelectItem value="7v7">
                    <span className="font-bold ">7-a-side</span>
                    <span className="text-zinc-500 ml-2">(2 Pitches)</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal bg-zinc-950/50 border-white/10 hover:bg-zinc-900 text-zinc-300 hover:text-white",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-emerald-500" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-zinc-900 border-white/10 text-white"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
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
            </div>

            {/* 3. Action Button */}
            <Button
              size="lg"
              onClick={handleCheckAvailability}
              className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              Check Availability
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
