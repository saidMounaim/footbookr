import Link from "next/link";
import Image from "next/image";
import { Wifi, Car, ShowerHead, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Pitch {
  id: string;
  name: string;
  type: string;
  pricePerHour: number;
  images: string[];
  rules: string[];
}

interface PitchCardProps {
  pitch: Pitch;
}

export default function PitchCard({ pitch }: PitchCardProps) {
  return (
    <Card className="p-0 pb-5 bg-zinc-900 border-white/10 overflow-hidden group hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10">
      <div className="relative h-56 w-full bg-zinc-800">
        <Image
          src={pitch.images[0]}
          alt={pitch.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge
          className={cn(
            "absolute top-4 left-4 border-none text-white font-bold",
            pitch.type === "5v5" ? "bg-emerald-600" : "bg-blue-600"
          )}
        >
          {pitch.type === "5v5" ? "5 vs 5" : "7 vs 7"}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              {pitch.name}
            </h3>
          </div>
          <div className="text-right flex items-center gap-1">
            <h5 className="text-xl font-bold text-white">
              ${pitch.pricePerHour}
            </h5>
            <span className="text-xs text-zinc-500">/ hour</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-4 text-xs text-zinc-500 border-t border-white/5 pt-4">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3" /> Free WiFi
          </div>
          <div className="flex items-center gap-1">
            <ShowerHead className="w-3 h-3" /> Showers
          </div>
          <div className="flex items-center gap-1">
            <Car className="w-3 h-3" /> Parking
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-white text-zinc-950 hover:bg-emerald-400 hover:text-zinc-950 font-bold h-11"
          asChild
        >
          <Link href={`/book/${pitch.id}`}>
            <Clock className="mr-2 h-4 w-4" />
            More details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
