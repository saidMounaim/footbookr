"use server";

import { startOfDay, endOfDay } from "date-fns";
import prisma from "../prisma";
import { closingHour, openingHour, TimeSlot } from "@/constants";

export async function getAvailableSlots(
  pitchId: string,
  date: Date
): Promise<TimeSlot[]> {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        pitchId: pitchId,
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
      select: {
        startTime: true,
      },
    });

    const slots: TimeSlot[] = [];
    const bookedTimes = new Set(bookings.map((b) => b.startTime));

    for (let i = openingHour; i < closingHour; i++) {
      const timeString = `${i}:00`;

      slots.push({
        time: timeString,
        booked: bookedTimes.has(timeString),
      });
    }

    return slots;
  } catch (error) {
    console.error("Failed to fetch slots:", error);
    return [];
  }
}
