import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <Card className="bg-zinc-900 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-zinc-500 mt-1 flex items-center">
          <span className="text-emerald-500 flex items-center mr-1">
            {trend.includes("+") ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : null}
            {trend}
          </span>
          from last month
        </p>
      </CardContent>
    </Card>
  );
}
