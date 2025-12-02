import { Separator } from "@/components/ui/separator";
import PitchCard from "@/components/shared/pitches/pitch-card";
import { getAllPitches } from "@/lib/data/pitches";
import PitchFilters from "@/components/shared/pitches/pitch-filters";

export default async function PitchesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const filterType = params.type;

  const pitches = await getAllPitches(filterType || "");

  return (
    <div className="flex flex-col">
      <main className="flex-1 pb-20 px-6">
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

            <PitchFilters />
          </div>

          <Separator className="bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pitches.length > 0 ? (
              pitches.map((pitch) => <PitchCard key={pitch.id} pitch={pitch} />)
            ) : (
              <p className="text-zinc-500 col-span-full text-center py-20">
                No pitches found for this category.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
