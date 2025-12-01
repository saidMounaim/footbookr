import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Search from "@/components/shared/admin/search";
import { UserActions } from "@/components/shared/admin/user-actions";
import {
  Shield,
  ShieldCheck,
  Mail,
  Calendar,
  Search as SearchIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUsers } from "@/lib/data/admin";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || "";

  const users = await getUsers(query);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Users
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {users.length} registered accounts
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Search placeholder="Search name or email" />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/50">
              <TableHead className="w-[250px] text-xs font-medium text-zinc-500 uppercase tracking-wider pl-6">
                User Profile
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Joined Date
              </TableHead>
              <TableHead className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
              >
                <TableCell className="pl-6 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-zinc-700">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className="bg-zinc-800 text-xs text-zinc-400">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-200">
                        {user.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {user.role === "admin" ? (
                    <Badge
                      variant="secondary"
                      className="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20"
                    >
                      <ShieldCheck className="w-3 h-3 mr-1" /> Admin
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-400"
                    >
                      <Shield className="w-3 h-3 mr-1" /> User
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                    {format(new Date(user.createdAt), "MMM dd, yyyy")}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.banned ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        <span className="text-xs text-red-400 font-medium">
                          Banned
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        <span className="text-xs text-emerald-500 font-medium">
                          Active
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>

                {/* 5. Actions */}
                <TableCell>
                  <UserActions userId={user.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/20">
            <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
              <SearchIcon className="h-5 w-5 text-zinc-500" />
            </div>
            <h3 className="text-zinc-300 font-medium text-sm">
              No users found
            </h3>
            <p className="text-zinc-500 text-xs mt-1 max-w-[200px]">
              {"We couldn't find anything matching"} {query}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
