import "server-only";
import prisma from "../prisma";
import { requireAdmin } from "./users";
import { subMonths, format } from "date-fns";

export async function getAdminStats() {
  await requireAdmin();

  const [totalBookings, totalUsers, totalPitches] = await Promise.all([
    prisma.booking.count(),
    prisma.user.count(),
    prisma.pitch.count(),
  ]);

  const revenueAgg = await prisma.booking.aggregate({
    _sum: { price: true },
  });
  const totalRevenue = revenueAgg._sum.price || 0;

  const recentBookings = await prisma.booking.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      pitch: { select: { name: true } },
    },
  });

  const sixMonthsAgo = subMonths(new Date(), 6);
  const bookings = await prisma.booking.findMany({
    where: { date: { gte: sixMonthsAgo } },
    select: { date: true, price: true },
  });

  const chartData = bookings.reduce((acc, curr) => {
    const month = format(curr.date, "MMM");
    const existing = acc.find((i) => i.name === month);
    if (existing) {
      existing.total += curr.price;
    } else {
      acc.push({ name: month, total: curr.price });
    }
    return acc;
  }, [] as { name: string; total: number }[]);

  return {
    metrics: { totalBookings, totalUsers, totalPitches, totalRevenue },
    recentBookings,
    chartData,
  };
}

export async function getBookings(query: string) {
  await requireAdmin();

  const bookings = await prisma.booking.findMany({
    where: {
      user: {
        name: { contains: query, mode: "insensitive" },
      },
    },
    include: {
      user: true,
      pitch: true,
    },
    orderBy: { date: "desc" },
    take: 20,
  });

  return bookings;
}
