import { VENUE_AMENITIES } from "@/constants";

export default function PitchAmenities() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {VENUE_AMENITIES.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center p-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-center"
        >
          <item.icon className="h-6 w-6 text-emerald-500 mb-2" />
          <span className="text-xs font-medium text-zinc-400">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
