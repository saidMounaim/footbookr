import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBookings } from "@/lib/data/admin";
import Search from "@/components/shared/admin/search";
import { Calendar, Clock, MapPin, Search as SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingActions } from "@/components/shared/admin/booking-actions";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || "";

  const bookings = await getBookings(query);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Bookings
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {bookings.length} reservations found
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Search placeholder="Search name" />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/50">
              <TableHead className="w-[100px] text-xs font-medium text-zinc-500 uppercase tracking-wider pl-6">
                ID
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Customer
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Details
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Date & Time
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">
                Amount
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const isPast = new Date(booking.date) < new Date();
              return (
                <TableRow
                  key={booking.id}
                  className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
                >
                  <TableCell className="pl-6 font-mono text-xs text-zinc-500 group-hover:text-zinc-400">
                    #{booking.id.slice(-4).toUpperCase()}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-zinc-700">
                        <AvatarImage src={booking.user.image || ""} />
                        <AvatarFallback className="bg-zinc-800 text-xs text-zinc-400">
                          {booking.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-200">
                          {booking.user.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {booking.user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                        {booking.pitch.name}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isPast
                              ? "bg-zinc-600"
                              : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            isPast
                              ? "text-zinc-500"
                              : "text-emerald-500 font-medium"
                          }`}
                        >
                          {isPast ? "Completed" : "Upcoming"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                        {format(booking.date, "MMM dd")}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Clock className="h-3 w-3" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <span className="font-mono text-sm font-medium text-white bg-zinc-800/50 px-2 py-1 rounded">
                      ${booking.price}
                    </span>
                  </TableCell>

                  <TableCell className="flex items-center justify-end gap-2">
                    <BookingActions bookingId={booking.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/20">
            <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
              <SearchIcon className="h-5 w-5 text-zinc-500" />
            </div>
            <h3 className="text-zinc-300 font-medium text-sm">
              No bookings found
            </h3>
            <p className="text-zinc-500 text-xs mt-1 max-w-[200px]">
              {"We couldn't find anything matching"} {query}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
