"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutAdminButton() {
  const router = useRouter();
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
    <Button
      variant="ghost"
      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
      onClick={handleSignOut}
    >
      <LogOut className="mr-2 h-4 w-4" /> Sign Out
    </Button>
  );
}
