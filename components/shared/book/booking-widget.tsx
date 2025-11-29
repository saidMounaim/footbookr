"use client";

import { useState, useEffect } from "react";
import { format, startOfToday, addDays, isBefore, isAfter } from "date-fns";
import { Info, Loader2 } from "lucide-react"; // Added Loader2
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
import { TimeSlot } from "@/constants";
import { toast } from "sonner";
import {
  createBooking,
  getAvailableSlots,
} from "@/lib/actions/booking,actions";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface BookingWidgetProps {
  pricePerHour: number;
  pitchId: string;
}

export default function BookingWidget({
  pricePerHour,
  pitchId,
}: BookingWidgetProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const today = startOfToday();
  const maxDate = addDays(today, 6);

  useEffect(() => {
    async function fetchSlots() {
      if (!date) return;
      setIsFetchingSlots(true);
      try {
        const slots = await getAvailableSlots(pitchId, date);
        setTimeSlots(slots);
      } catch (error) {
        console.error("Error fetching slots", error);
        toast.error("Failed to fetch available slots.");
      } finally {
        setIsFetchingSlots(false);
      }
    }

    fetchSlots();
    setSelectedSlot(null);
  }, [date, pitchId]);

  const handleBook = async () => {
    if (!selectedSlot || !date) {
      toast.error("Please select a date and time slot.");
      return;
    }

    if (selectedSlot && date && !session) {
      toast.error("Please sign in to book a pitch.");
      return;
    }

    setIsBooking(true);
    try {
      const result = await createBooking({
        pitchId,
        date,
        startTime: selectedSlot,
      });

      if (result.success) {
        toast.success(result.message);
        setDate(undefined);
        setSelectedSlot(null);
        router.refresh();
      } else {
        if (result.errors) {
          const errorMessages = Object.values(result.errors);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          errorMessages.forEach((errMssg: any) => {
            errMssg.forEach((msg: string) => toast.error(msg));
          });
          return;
        }
        toast.error(result.message);
      }

      setIsBooking(false);
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <Card className="sticky top-24 bg-zinc-900 border-white/10 shadow-2xl overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-4">
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
                day_today: "bg-zinc-800 text-white font-bold",
                day_disabled: "text-zinc-700 opacity-50 cursor-not-allowed",
              }}
              disabled={(d) => isBefore(d, today) || isAfter(d, maxDate)}
              fromDate={today}
              toDate={maxDate}
            />
          </div>

          <div className="p-6">
            <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider flex justify-between">
              {date
                ? `Slots for ${format(date, "EEE, MMM d")}`
                : "Select a Date"}
            </h3>

            <div className="pr-4">
              {isFetchingSlots ? (
                <div className="grid grid-cols-3 gap-2 opacity-50 pointer-events-none">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-zinc-800 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : (
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
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-zinc-950 p-6 border-t border-white/10 flex-col gap-4">
          {selectedSlot && date ? (
            <div className="w-full space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Date</span>
                <span className="text-white font-medium">
                  {format(date, "PPP")}
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
                <span className="text-emerald-400">${pricePerHour}</span>
              </div>

              <Button
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base shadow-lg shadow-emerald-900/20 cursor-pointer"
                onClick={handleBook}
                disabled={isBooking}
              >
                {isBooking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Confirming...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          ) : (
            <div className="w-full text-center py-2 text-zinc-500 text-sm italic">
              {!date ? "Select a date" : "Select a time slot"}
            </div>
          )}
        </CardFooter>
      </Card>

      <div className="mt-6 p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
        <Info className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-200/80 leading-relaxed">
          Full refund available if cancelled 24 hours before the match time.
        </p>
      </div>
    </>
  );
}
