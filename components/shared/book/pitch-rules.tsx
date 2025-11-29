import { CheckCircle2 } from "lucide-react";

interface PitchRulesProps {
  rules: string[];
}

export default function PitchRules({ rules }: PitchRulesProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-4">Venue Rules</h2>
      <ul className="space-y-3">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex items-start gap-3 text-zinc-400">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
