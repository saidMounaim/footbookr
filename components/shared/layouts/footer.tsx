import { performance } from "perf_hooks";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 py-12">
      <div className="container mx-auto px-6 text-center text-zinc-600 text-sm">
        <p>
          &copy; {performance.now()} FootBookr Inc. Designed for the modern
          athlete.
        </p>
      </div>
    </footer>
  );
}
