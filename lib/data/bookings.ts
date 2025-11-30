import "server-only";

import prisma from "../prisma";
import { requireUser } from "./users";

export async function getBooking(bookingId: string) {
  const session = await requireUser();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      pitch: true,
    },
  });

  if (!booking || booking.userId !== session.user.id) {
    return null;
  }

  return booking;
}
