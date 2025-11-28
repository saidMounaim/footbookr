import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Zap } from "lucide-react";
import Image from "next/image";

export default function Features() {
  return (
    <section className="container mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        <Card className="md:col-span-2 md:row-span-2 relative overflow-hidden border-white/10 bg-zinc-900 group">
          <div className="absolute inset-0">
            <Image
              src="https://placehold.co/800x800/052e16/10b981/png?text=Pitch+Analytics"
              alt="Analytics"
              fill
              className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          </div>
          <CardHeader className="absolute bottom-0 left-0 z-10 p-8  w-full">
            <CardTitle className="text-3xl text-white mb-2">
              Detailed Pitch Profiles
            </CardTitle>
            <CardDescription className="text-zinc-300 text-base">
              {
                "High-res photos, surface type info, and real facility ratings. Know exactly where you're playing."
              }
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-white/10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors flex flex-col justify-center p-6">
          <CardHeader className="p-0 mb-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Zap className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <CardTitle className="text-xl text-white mb-2">
              Instant Confirmation
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Book and receive your QR code pass instantly.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors flex flex-col justify-center p-6">
          <CardHeader className="p-0 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <CardTitle className="text-xl text-white mb-2">
              Team Splitting
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Invite friends and split the cost automatically.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
