"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { DollarSign, Users, Calendar, MapPin, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import StatCard from "./stat-card";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#10b981",
  },
} satisfies ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DashboardContent({ data }: any) {
  return (
    <div className="space-y-8 w-full animate-in fade-in duration-500">
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${data.metrics.totalRevenue}`}
          icon={DollarSign}
          trend="+12.5%"
          color="emerald"
        />
        <StatCard
          title="Total Bookings"
          value={data.metrics.totalBookings}
          icon={Calendar}
          trend="+4"
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={data.metrics.totalUsers}
          icon={Users}
          trend="+2.1%"
          color="purple"
        />
        <StatCard
          title="Total Pitches"
          value={data.metrics.totalPitches}
          icon={MapPin}
          trend="Stable"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white flex justify-between items-center">
              <span>Revenue Overview</span>
              <Badge
                variant="outline"
                className="border-white/10 text-zinc-400 font-normal"
              >
                Last 6 Months
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <AreaChart
                accessibilityLayer
                data={data.chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#27272a"
                />

                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                  stroke="#71717a"
                />

                {/* Shadcn's Smart Tooltip */}
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />

                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>

                <Area
                  dataKey="total"
                  type="natural" // Makes the line smooth/curved
                  fill="url(#fillRevenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-zinc-500">
              Latest reservations made.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.recentBookings.map((booking: any) => (
                <div
                  key={booking.id}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-inner">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white leading-none">
                        {booking.user.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span className="text-zinc-400">
                          {booking.pitch.name}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <span>
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    >
                      ${booking.price}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
