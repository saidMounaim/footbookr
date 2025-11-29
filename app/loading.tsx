import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-950 gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
    </div>
  );
}
