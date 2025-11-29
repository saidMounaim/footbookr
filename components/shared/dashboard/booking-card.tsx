"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Calendar as CalendarIcon, Clock, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  booking: any;
  type: "upcoming" | "past";
}

export default function BookingCard({ booking, type }: BookingCardProps) {
  const isUpcoming = type === "upcoming";

  return (
    <Card
      className={`
        p-0 flex flex-col sm:flex-row overflow-hidden border-white/10 bg-zinc-900 transition-all
        ${
          isUpcoming
            ? "shadow-lg shadow-emerald-900/10 hover:border-emerald-500/30"
            : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
        }
      `}
    >
      <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0 bg-zinc-800">
        <Image
          src={booking.pitch.images[0]}
          alt={booking.pitch.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 sm:hidden">
          <Badge
            className={
              isUpcoming
                ? "bg-emerald-500 text-black"
                : "bg-zinc-700 text-white"
            }
          >
            {isUpcoming ? "Scheduled" : "Completed"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-white text-xl tracking-tight">
              {booking.pitch.name}
            </h3>
          </div>

          <Badge
            className={`hidden sm:flex ${
              isUpcoming
                ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {isUpcoming ? "Scheduled" : "Completed"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-zinc-300 mb-4">
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">
              {format(new Date(booking.date), "MMMM do, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>
              {booking.startTime} - {booking.endTime}
            </span>
          </div>
        </div>

        {isUpcoming && (
          <div className="flex justify-end pt-2 border-t border-white/5">
            <Button
              variant="link"
              className="text-emerald-400 hover:text-emerald-300 p-0 h-auto font-semibold text-sm group"
              asChild
            >
              <Link href={`/book/${booking.pitchId}`}>
                View Details
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
