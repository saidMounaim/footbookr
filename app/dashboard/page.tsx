import { isPast, isFuture, endOfDay } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserBookings } from "@/lib/data/users";
import BookingCard from "@/components/shared/dashboard/booking-card";

export default async function DashboardPage() {
  const bookings = await getUserBookings();

  const upcoming = bookings.filter((b) => isFuture(endOfDay(b.date)));
  const past = bookings.filter((b) => isPast(endOfDay(b.date)));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-30 pb-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-white">My Bookings</h1>
          <p className="text-zinc-400">
            Manage your upcoming matches and view history.
          </p>
        </div>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Upcoming Matches
          </h2>

          {upcoming.length === 0 ? (
            <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center bg-zinc-900/30">
              <p className="text-zinc-500 mb-4">
                You have no upcoming matches.
              </p>
              <Button
                asChild
                className="bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400"
              >
                <Link href="/pitches">Book a Pitch</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcoming.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  type="upcoming"
                />
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="space-y-6 opacity-80 hover:opacity-100 transition-opacity">
            <h2 className="text-xl font-semibold text-zinc-300">
              Match History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {past.map((booking) => (
                <BookingCard key={booking.id} booking={booking} type="past" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
