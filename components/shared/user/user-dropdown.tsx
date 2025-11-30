"use client";

import { LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getUserInitials } from "@/lib/utils";
import Link from "next/link";

export default function UserDropdown() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) return null;

  const userInitials = getUserInitials(session.user.name);
  const avatarUrl =
    session.user.image ||
    `https://avatar.vercel.sh/${userInitials}.svg?text=${userInitials}`;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <Image
            src={avatarUrl}
            alt={session.user.name || "User"}
            fill
            className="object-cover"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-zinc-950/90 backdrop-blur-xl border-white/10 text-zinc-200"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-zinc-500 truncate">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer w-full flex items-center"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer w-full flex items-center"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer w-full flex items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-red-400 focus:bg-red-500/10 focus:text-red-300 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
