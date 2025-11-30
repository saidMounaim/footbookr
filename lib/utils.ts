import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to extract initials
export function getUserInitials(name: string = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getBookingStatus(booking: any) {
  const now = new Date();
  const matchStart = new Date(booking.date);
  const matchEnd = new Date(booking.date);

  const [startH, startM] = booking.startTime.split(":").map(Number);
  const [endH, endM] = booking.endTime.split(":").map(Number);

  matchStart.setHours(startH, startM, 0, 0);
  matchEnd.setHours(endH, endM, 0, 0);

  if (now >= matchStart && now <= matchEnd) {
    return "live";
  } else if (now < matchStart) {
    return "upcoming";
  } else {
    return "past";
  }
}
