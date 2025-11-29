import { Separator } from "@/components/ui/separator";
import PitchHero from "@/components/shared/book/pitch-hero";
import PitchAmenities from "@/components/shared/book/pitch-amenities";
import PitchRules from "@/components/shared/book/pitch-rules";
import BookingWidget from "@/components/shared/book/booking-widget";

const pitchData = {
  id: "p1",
  name: "Alpha Field",
  type: "5v5",
  pricePerHour: 40,
  description:
    "Our premier 5-a-side pitch featuring the latest generation synthetic turf. Perfect for fast-paced games. Includes professional-grade floodlights and sideline benches.",
  images: [
    "https://placehold.co/1200x800/064e3b/10b981/png?text=Alpha+Field+Main",
    "https://placehold.co/800x600/065f46/34d399/png?text=Turf+Detail",
    "https://placehold.co/800x600/022c22/10b981/png?text=Night+View",
  ],
  rules: [
    "No metal studs allowed",
    "Max 10 players on pitch",
    "Arrive 15 mins early",
  ],
};

export default async function PitchDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 font-sans mt-7">
      <main className="flex-1 pt-24 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            <div className="lg:col-span-2 space-y-8">
              <PitchHero
                name={pitchData.name}
                type={pitchData.type}
                image={pitchData.images[0]}
              />

              <PitchAmenities />

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  About this pitch
                </h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {pitchData.description}
                </p>
              </section>

              <Separator className="bg-white/10" />

              <PitchRules rules={pitchData.rules} />
            </div>

            <div className="lg:col-span-1">
              <BookingWidget
                pricePerHour={pitchData.pricePerHour}
                pitchId={id}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
