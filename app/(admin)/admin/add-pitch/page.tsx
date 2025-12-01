import AddPitchForm from "@/components/shared/forms/add-pitch-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { requireAdmin } from "@/lib/data/users";

export default async function AddPitchPage() {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex justify-center pb-10">
      <Card className="w-full max-w-2xl bg-zinc-900/80 backdrop-blur-xl border-white/10 shadow-2xl h-fit">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Add New Pitch
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Create a new pitch listing for your venue.
          </CardDescription>
        </CardHeader>

        <AddPitchForm />
      </Card>
    </div>
  );
}
