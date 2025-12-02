"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-6 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
          The best turf in town. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
            Book your match.
          </span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Welcome to the official booking site for{" "}
          <strong className="text-white">FootBookr Arena</strong>. We host 3
          pro-grade 5-a-side fields and 2 regulation 7-a-side fields ready for
          your team.
        </p>

        <div className="pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all transform hover:scale-105"
          >
            <Link href="/pitches">
              Explore Pitches <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
