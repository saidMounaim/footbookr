import { Separator } from "@/components/ui/separator";
import PitchHero from "@/components/shared/book/pitch-hero";
import PitchAmenities from "@/components/shared/book/pitch-amenities";
import PitchRules from "@/components/shared/book/pitch-rules";
import BookingWidget from "@/components/shared/book/booking-widget";
import { notFound } from "next/navigation";
import { getPitchById } from "@/lib/data/pitches";

export default async function PitchDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pitch = await getPitchById(id);

  if (!pitch) notFound();

  return (
    <div className="flex flex-col">
      <main className="flex-1 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            <div className="lg:col-span-2 space-y-8">
              <PitchHero
                name={pitch.name}
                type={pitch.type}
                images={pitch.images}
              />

              <PitchAmenities />

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  About this pitch
                </h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {pitch.description}
                </p>
              </section>

              <Separator className="bg-white/10" />

              <PitchRules rules={pitch.rules} />
            </div>

            <div className="lg:col-span-1">
              <BookingWidget pricePerHour={pitch.pricePerHour} pitchId={id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
