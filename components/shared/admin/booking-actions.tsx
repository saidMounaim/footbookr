"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CancelBookingButton } from "../dashboard/cancel-button";
import Link from "next/link";

export function BookingActions({ bookingId }: { bookingId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-zinc-900 border-zinc-800 text-zinc-300"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem asChild>
          <Link
            href={`/bookings/${bookingId}`}
            className="focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer w-full flex items-center"
          >
            More details
          </Link>
        </DropdownMenuItem>
        <div className="p-1">
          <CancelBookingButton bookingId={bookingId} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
