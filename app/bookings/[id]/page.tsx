import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import { getBooking } from "@/lib/data/bookings";
import { getBookingStatus } from "@/lib/utils";
import { CancelBookingButton } from "@/components/shared/dashboard/cancel-button";

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) return notFound();

  const status = getBookingStatus(booking);

  const qrData = JSON.stringify({
    id: booking.id,
    userId: booking.userId,
    pitch: booking.pitch.name,
    date: booking.date,
    time: booking.startTime,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4 flex flex-col items-center mt-15">
      <div className="w-full max-w-lg mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white hover:bg-white/10"
          asChild
        >
          <Link href="/dashboard">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Booking Details</h1>
      </div>

      <Card className="w-full max-w-lg bg-zinc-900 border-white/10 overflow-hidden shadow-2xl">
        <div className="relative h-48 w-full bg-zinc-800">
          <Image
            src={booking.pitch.images[0] || "/placeholder.jpg"}
            alt={booking.pitch.name}
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-900 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {booking.pitch.name}
              </h2>

              <div className="mt-2">
                {status === "live" && (
                  <Badge className="bg-red-500 text-white border-none animate-pulse hover:bg-red-600">
                    ● Live Now
                  </Badge>
                )}
                {status === "upcoming" && (
                  <Badge className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 border-none font-bold">
                    Scheduled
                  </Badge>
                )}
                {status === "past" && (
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-400 border-white/5"
                  >
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-8">
          <div className="flex justify-between items-center p-4 bg-zinc-950/50 rounded-xl border border-white/5">
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold">
                  Date
                </p>
                <p className="text-white font-medium">
                  {format(booking.date, "EEE, MMM do")}
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex gap-3 items-center">
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold text-right">
                  Time
                </p>
                <p className="text-white font-medium">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-white p-4 rounded-xl">
              <div className="h-auto w-full max-w-[150px]">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrData}
                  viewBox={`0 0 256 256`}
                  fgColor="#000000"
                  bgColor="#ffffff"
                  level="M"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-400">
                Show this code at the reception
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                Booking ID:{" "}
                <span className="font-mono text-zinc-500">{booking.id}</span>
              </p>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Total Price</span>
            <span className="text-2xl font-bold text-white">
              ${booking.price}
            </span>
          </div>
        </CardContent>

        <CardFooter className="bg-zinc-950 p-6 border-t border-white/10 flex-col gap-3">
          {status === "upcoming" && (
            <>
              <CancelBookingButton bookingId={booking.id} />
              <p className="text-xs text-center text-zinc-600">
                Cancellations allowed up to 24 hours before match time.
              </p>
            </>
          )}

          {status === "live" && (
            <div className="w-full text-center p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm font-medium">
              Match in progress. Have a great game!
            </div>
          )}

          {status === "past" && (
            <Button
              className="w-full bg-white text-zinc-950 hover:bg-zinc-200 cursor-pointer"
              asChild
            >
              <Link href={`/book/${booking.pitchId}`}>Book Again</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
