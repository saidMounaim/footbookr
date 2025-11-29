"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export interface TimeSlot {
  time: string;
  price: number;
  booked: boolean;
}

interface BookingWidgetProps {
  pricePerHour: number;
  pitchId: string;
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let i = 10; i < 23; i++) {
    const isBooked = Math.random() < 0.3;
    slots.push({
      time: `${i}:00`,
      price: i >= 18 ? 50 : 40,
      booked: isBooked,
    });
  }
  return slots;
};

export default function BookingWidget({
  pricePerHour,
  pitchId,
}: BookingWidgetProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const handleBook = async () => {
    if (!selectedSlot || !date) return;
    setIsLoading(true);
    try {
      console.log("Booking:", { pitchId, date, selectedSlot });
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="sticky top-24 bg-zinc-900 border-white/10 shadow-2xl overflow-hidden">
        <CardHeader className=" border-b border-white/5 pb-4">
          <CardTitle className="flex justify-between items-center text-white">
            <span>Select Time</span>
            <span className="text-emerald-400 text-lg font-bold">
              ${pricePerHour}
              <span className="text-sm text-zinc-500 font-normal">/hr</span>
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4 border-b border-white/5 bg-zinc-950/30 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-white/5 bg-zinc-900 text-white"
              classNames={{
                day_selected:
                  "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 focus:bg-emerald-500",
                day_today: "bg-zinc-800 text-white",
              }}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          </div>

          <div className="p-6">
            <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">
              Available Slots
            </h3>
            <div className="pr-4">
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={slot.booked}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={cn(
                      "flex flex-col items-center justify-center py-3 rounded-lg border text-sm transition-all duration-200",
                      slot.booked
                        ? "bg-zinc-950/50 border-transparent text-zinc-600 cursor-not-allowed decoration-zinc-600/50"
                        : slot.time === selectedSlot
                        ? "bg-emerald-500 border-emerald-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "bg-zinc-800 border-white/5 text-zinc-300 hover:bg-zinc-700 hover:border-white/20"
                    )}
                  >
                    <span className={slot.booked ? "line-through" : ""}>
                      {slot.time}
                    </span>
                    {!slot.booked && (
                      <span className="text-[10px] opacity-80">
                        ${slot.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-zinc-950 p-6 border-t border-white/10 flex-col gap-4">
          {selectedSlot ? (
            <div className="w-full space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Date</span>
                <span className="text-white font-medium">
                  {date ? format(date, "PPP") : ""}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Time</span>
                <span className="text-white font-medium">
                  {selectedSlot} - {parseInt(selectedSlot) + 1}:00
                </span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-emerald-400">
                  ${timeSlots.find((s) => s.time === selectedSlot)?.price}
                </span>
              </div>
              <Button
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base shadow-lg shadow-emerald-900/20"
                onClick={handleBook}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          ) : (
            <div className="w-full text-center py-2 text-zinc-500 text-sm italic">
              Select a date and time to book
            </div>
          )}
        </CardFooter>
      </Card>

      <div className="mt-6 p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
        <Info className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-200/80 leading-relaxed">
          Full refund available if cancelled 24 hours before the match time.
          Secure payment via Stripe.
        </p>
      </div>
    </>
  );
}
