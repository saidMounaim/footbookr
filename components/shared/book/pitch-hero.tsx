"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PitchHeroProps {
  name: string;
  type: string;
  images: string[];
}

export default function PitchHero({ name, type, images }: PitchHeroProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
      <Carousel
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="ml-0 h-[400px]">
          {images.map((src, index) => (
            <CarouselItem key={index} className="w-full pl-0 h-full relative">
              <Image
                src={src}
                alt={`${name} view ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      </Carousel>

      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent p-8 z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold border-none">
            {type}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-white drop-shadow-md">{name}</h1>
      </div>
    </div>
  );
}
