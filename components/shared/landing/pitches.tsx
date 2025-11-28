import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

export default function Pitches() {
  return (
    <section className="border-y border-white/5 bg-white/2 py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white">Trending Pitches</h2>
            <p className="text-zinc-500">
              Highly rated fields booked this week.
            </p>
          </div>
          <Button
            variant="link"
            className="text-emerald-400 hover:text-emerald-300 p-0 h-auto"
          >
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="bg-zinc-900 border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-900/10 group"
            >
              <div className="relative h-56 w-full bg-zinc-800">
                <Image
                  src={`https://placehold.co/600x400/18181b/ffffff/png?text=Pitch+${i}`}
                  alt="Pitch"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border-white/10 text-white hover:bg-black/70">
                  <Star className="w-3 h-3 text-emerald-400 mr-1 fill-current" />{" "}
                  4.9
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Urban Sky Field
                    </h3>
                    <p className="text-sm text-zinc-500">Downtown District</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">$60</p>
                    <p className="text-xs text-zinc-500">/ hour</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-6">
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  >
                    5 vs 5
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  >
                    Turf
                  </Badge>
                </div>
                <Button className="w-full bg-white text-zinc-950 hover:bg-emerald-400 hover:text-zinc-950 font-bold">
                  Book Slot
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
