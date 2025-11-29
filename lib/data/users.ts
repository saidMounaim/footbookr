import "server-only";

import { auth } from "../auth";
import { headers } from "next/headers";
import prisma from "../prisma";
import { cache } from "react";
import { redirect } from "next/navigation";

export const requireUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return session;
});

export async function getUserBookings() {
  const session = await requireUser();

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      pitch: {
        select: {
          name: true,
          images: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return bookings;
}
