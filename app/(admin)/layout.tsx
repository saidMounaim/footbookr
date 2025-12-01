import Link from "next/link";
import { LayoutDashboard, Calendar, Users, MapPin } from "lucide-react";
import LogoutAdminButton from "@/components/shared/admin/logout-admin-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { label: "Pitches", href: "/admin/pitches", icon: MapPin },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-50">
      <aside className="w-64 border-r border-white/10 bg-zinc-900/50 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-white">
            <span className="text-emerald-500">Admin</span>Panel
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <LogoutAdminButton />
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
