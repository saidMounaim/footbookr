"use client";

import { useState } from "react";
import { MoreHorizontal, Ban, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteUserButton } from "./delete-user-button";
import { ChangeRoleDialog } from "./change-role-dialog"; // Import the new component

interface UserActionsProps {
  userId: string;
  currentRole: string;
}

export function UserActions({ userId, currentRole }: UserActionsProps) {
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-zinc-900 border-zinc-800 text-zinc-300 w-48"
        >
          <DropdownMenuLabel>User Management</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />

          <DropdownMenuItem
            className="focus:bg-zinc-800 focus:text-white cursor-pointer"
            onClick={() => setShowRoleDialog(true)}
          >
            <Shield className="mr-2 h-4 w-4" /> Change Role
          </DropdownMenuItem>

          <DropdownMenuItem className="text-amber-500 focus:text-amber-400 focus:bg-amber-500/10 cursor-pointer">
            <Ban className="mr-2 h-4 w-4" /> Ban User
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-zinc-800" />

          <div className="p-1">
            <DeleteUserButton userId={userId} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangeRoleDialog
        open={showRoleDialog}
        onOpenChange={setShowRoleDialog}
        userId={userId}
        currentRole={currentRole}
      />
    </>
  );
}
