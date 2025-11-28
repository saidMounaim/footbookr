import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 text-center space-y-8">
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 py-1.5 px-4 rounded-full uppercase tracking-wider text-xs font-semibold animate-in fade-in slide-in-from-bottom-4"
        >
          <span className="mr-2 relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Weekend Availability
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          The field is yours. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            Book it in seconds.
          </span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Instant access to the best pitches in your city. No phone calls, no
          cash, just pure football.
        </p>

        <Card className="mx-auto max-w-3xl bg-zinc-900/50 border-white/10 backdrop-blur-md shadow-2xl overflow-hidden p-0">
          <CardContent className="p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative group">
              <div className="absolute left-3 top-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                <MapPin className="h-4 w-4" />
              </div>
              <Input
                placeholder="Where do you want to play?"
                className="pl-10 h-12 bg-transparent border-transparent hover:bg-white/5 focus-visible:ring-0 focus-visible:bg-white/5 text-base placeholder:text-zinc-600"
              />
            </div>
            <div className="w-px bg-white/10 hidden md:block my-2" />
            <div className="flex-1 relative group">
              <div className="absolute left-3 top-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                <Calendar className="h-4 w-4" />
              </div>
              <Input
                placeholder="Date & Time"
                className="pl-10 h-12 bg-transparent border-transparent hover:bg-white/5 focus-visible:ring-0 focus-visible:bg-white/5 text-base placeholder:text-zinc-600"
              />
            </div>
            <Button
              size="lg"
              className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              Search
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
