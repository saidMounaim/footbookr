import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full pt-6 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between rounded-full border border-white/10 bg-zinc-950/60 px-6 backdrop-blur-xl shadow-2xl">
          <Link
            className="flex items-center gap-2 font-bold text-xl tracking-tighter"
            href="/"
          >
            <span className="text-white">
              Foot
              <span className="text-emerald-600">Bookr</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-zinc-300 hover:text-white hover:bg-white/5"
              asChild
            >
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button
              className="rounded-full bg-white text-zinc-950 hover:bg-emerald-400 hover:text-zinc-950 font-bold"
              asChild
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
