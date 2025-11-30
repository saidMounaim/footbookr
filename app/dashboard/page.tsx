import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserBookings } from "@/lib/data/users";
import BookingCard from "@/components/shared/dashboard/booking-card";
import { getBookingStatus } from "@/lib/utils";

export default async function DashboardPage() {
  const bookings = await getUserBookings();

  const live = bookings.filter((b) => getBookingStatus(b) === "live");
  const upcoming = bookings.filter((b) => getBookingStatus(b) === "upcoming");
  const past = bookings.filter((b) => getBookingStatus(b) === "past");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 mt-30 pb-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-white">My Bookings</h1>
          <p className="text-zinc-400">
            Manage your upcoming matches and view history.
          </p>
        </div>

        {live.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h2 className="text-xl font-bold text-white">Happening Now</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {live.map((booking) => (
                <div key={booking.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-red-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                  <div className="relative">
                    <BookingCard booking={booking} type="upcoming" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Upcoming Matches
          </h2>

          {upcoming.length === 0 && live.length === 0 ? (
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
