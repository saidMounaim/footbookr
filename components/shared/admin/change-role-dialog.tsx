"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateUserRole } from "@/lib/actions/user.actions";

interface ChangeRoleDialogProps {
  userId: string;
  currentRole: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeRoleDialog({
  userId,
  currentRole,
  open,
  onOpenChange,
}: ChangeRoleDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [role, setRole] = useState(currentRole);

  const handleSave = () => {
    if (role === currentRole) {
      onOpenChange(false);
      return;
    }

    startTransition(async () => {
      const result = await updateUserRole(userId, role);

      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Select a new role for this user. This will affect their permissions
            immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Role</label>
            <Select value={role} onValueChange={setRole} disabled={isPending}>
              <SelectTrigger className="w-full bg-zinc-950 border-white/10 text-white">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="w-full bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-zinc-400 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
