import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 text-zinc-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/10">
          <SearchX className="h-10 w-10 text-emerald-500" />
        </div>

        <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-3">
          Pitch Not Found
        </h2>
        <p className="text-zinc-400 max-w-[400px] mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            variant="default"
            className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-105"
          >
            <Link href="/">Return Home</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 px-8 border-zinc-800 bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full"
          >
            <Link href="/pitches" className="flex items-center gap-2">
              <MoveLeft className="w-4 h-4" /> Go Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
    </div>
  );
}
