import DashboardContent from "@/components/shared/admin/dashboard-content";
import { getAdminStats } from "@/lib/data/admin";

export default async function AdminDashboard() {
  const data = await getAdminStats();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-zinc-400">
          {"Welcome back, Admin. Here is what's happening today."}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <DashboardContent data={data} />
      </div>
    </div>
  );
}
