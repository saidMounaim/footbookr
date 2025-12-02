"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { auth } from "../auth";
import { headers } from "next/headers";
import { ActionState } from "@/constants";

export async function deleteUser(userId: string): Promise<ActionState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, message: "Unauthorized" };

    if (session.user.role !== "admin") {
      return { success: false, message: "Insufficient permissions" };
    }

    if (session.user.id === userId) {
      return { success: false, message: "You cannot delete your own account." };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Delete User Error:", error);
    return { success: false, message: "Failed to delete user." };
  }
}

export async function updateUserRole(
  userId: string,
  newRole: string
): Promise<ActionState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, message: "Unauthorized" };

    if (session.user.role !== "admin")
      return { success: false, message: "Admins only" };

    if (session.user.id === userId) {
      return { success: false, message: "You cannot change your own role." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/users");

    return { success: true, message: `User role updated to ${newRole}` };
  } catch (error) {
    console.error("Update Role Error:", error);
    return { success: false, message: "Failed to update role" };
  }
}
