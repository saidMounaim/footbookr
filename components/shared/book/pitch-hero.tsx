import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PitchHeroProps {
  name: string;
  type: string;
  image: string;
}

export default function PitchHero({ name, type, image }: PitchHeroProps) {
  return (
    <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <Image
        src={image}
        alt="Main View"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-zinc-950 to-transparent p-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold">
            {type}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-white">{name}</h1>
      </div>
    </div>
  );
}
