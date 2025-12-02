import Hero from "@/components/shared/landing/hero";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50">
      <main className="flex-1 pb-20 space-y-24">
        <Hero />
        {/* <Features />
        <Pitches /> */}
      </main>
    </div>
  );
}
