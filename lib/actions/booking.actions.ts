"use server";

import { startOfDay, endOfDay, differenceInHours } from "date-fns";
import prisma from "../prisma";
import { ActionState, closingHour, openingHour, TimeSlot } from "@/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { createBookingSchema } from "../zodSchemas";
import { auth } from "../auth";
import { headers } from "next/headers";
import { z } from "zod";

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

export async function createBooking(
  data: z.infer<typeof createBookingSchema>
): Promise<ActionState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, message: "You must be logged in to book." };
    }

    const validated = createBookingSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { pitchId, date, startTime } = validated.data;
    const normalizedDate = startOfDay(date);

    await prisma.$transaction(async (tx) => {
      const pitch = await tx.pitch.findUnique({
        where: { id: pitchId },
      });

      if (!pitch) throw new Error("Pitch not found");

      const existingBooking = await tx.booking.findFirst({
        where: {
          pitchId,
          date: normalizedDate,
          startTime,
        },
      });

      if (existingBooking) {
        throw new Error("This time slot is no longer available.");
      }
      const startHour = parseInt(startTime.split(":")[0]);

      const endHour = startHour + 1;
      const endTime = `${endHour}:00`;

      await tx.booking.create({
        data: {
          date: normalizedDate,
          startTime,
          endTime,
          price: pitch.pricePerHour,
          pitchId,
          userId: session.user.id,
        },
      });
    });

    revalidatePath(`/book/${pitchId}`);
    revalidateTag(`pitch-${pitchId}`, "max");
    return { success: true, message: "Booking confirmed successfully!" };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Booking Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}

export async function cancelBooking(bookingId: string): Promise<ActionState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, message: "Unauthorized. Please log in." };
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { success: false, message: "Booking not found." };
    }

    if (booking.userId !== session.user.id) {
      return {
        success: false,
        message: "You are not authorized to cancel this booking.",
      };
    }

    const matchDate = new Date(booking.date);
    const [hours, minutes] = booking.startTime.split(":").map(Number);
    matchDate.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const hoursDifference = differenceInHours(matchDate, now);

    if (hoursDifference < 24) {
      return {
        success: false,
        message:
          "Cancellations are only allowed up to 24 hours before the match.",
      };
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/bookings/${bookingId}`);

    return { success: true, message: "Booking cancelled successfully." };
  } catch (error) {
    console.error("Cancellation Error:", error);
    return {
      success: false,
      message: "Internal server error. Please try again.",
    };
  }
}
