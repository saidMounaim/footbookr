import { Separator } from "@/components/ui/separator";
import PitchCard from "@/components/shared/pitches/pitch-card";
import { getAllPitches } from "@/lib/data/pitches";

export default async function PitchesPage() {
  const pitches = await getAllPitches();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Select a Pitch
              </h1>
              <p className="text-zinc-400 mt-2">
                Find the perfect field for your match.
              </p>
            </div>

            {/* <PitchFilters
              date={date}
              onDateChange={setDate}
              filterType={filterType}
              onFilterTypeChange={setFilterType}
            /> */}
          </div>

          <Separator className="bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pitches.map((pitch) => (
              <PitchCard key={pitch.id} pitch={pitch} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
