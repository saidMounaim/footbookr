import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Plus, Users, DollarSign } from "lucide-react";
import { getAllPitches } from "@/lib/data/pitches";
import { PitchActions } from "@/components/shared/admin/pitch-actions";
import { requireAdmin } from "@/lib/data/users";

export default async function AdminPitchesPage() {
  await requireAdmin();

  const pitches = await getAllPitches();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Pitches
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {pitches.length} venues available
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold"
          >
            <Link href="/admin/add-pitch">
              <Plus className="w-4 h-4 mr-2" /> Add Pitch
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/50">
              <TableHead className="w-[100px] text-xs font-medium text-zinc-500 uppercase tracking-wider pl-6">
                Preview
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Type
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">
                Rate / Hour
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pitches.map((pitch) => (
              <TableRow
                key={pitch.id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
              >
                <TableCell className="pl-6 py-3">
                  <div className="relative h-12 w-20 rounded-md overflow-hidden border border-zinc-800 bg-zinc-800">
                    <Image
                      src={pitch.images[0] || "/placeholder.jpg"}
                      alt={pitch.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-zinc-200">
                      {pitch.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-800/50 border border-zinc-800">
                    <Users className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs font-medium text-zinc-300">
                      {pitch.type}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1 font-mono text-sm font-medium text-emerald-400">
                    <DollarSign className="h-3 w-3" />
                    {pitch.pricePerHour}
                  </div>
                </TableCell>

                <TableCell>
                  <PitchActions pitchId={pitch.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {pitches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/20">
            <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
              <SearchIcon className="h-5 w-5 text-zinc-500" />
            </div>
            <h3 className="text-zinc-300 font-medium text-sm">
              No pitches found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
