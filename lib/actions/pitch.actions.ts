"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "../data/users";
import prisma from "../prisma";
import { pitchFormSchema } from "../zodSchemas";
import { z } from "zod";

export async function createPitch(values: z.infer<typeof pitchFormSchema>) {
  await requireAdmin();

  try {
    const validated = pitchFormSchema.safeParse(values);

    if (!validated.success) {
      return {
        success: false,
        message: "Invalid Fields",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const data = validated.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenedRules = data.rules.map((r: any) => r.value);

    await prisma.pitch.create({
      data: {
        name: data.name,
        type: data.type,
        pricePerHour: data.pricePerHour,
        description: data.description,
        images: data.images,
        rules: flattenedRules,
      },
    });

    revalidatePath("/admin/pitches");
    revalidatePath("/admin/dashboard");
    revalidateTag("pitches", "max");
    return { success: true, message: "Pitch created successfully!" };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function deletePitch(pitchId: string) {
  await requireAdmin();

  try {
    await prisma.pitch.delete({
      where: { id: pitchId },
    });

    revalidatePath("/admin/pitches");
    revalidatePath("/admin/dashboard");
    revalidateTag("pitches", "max");
    return { success: true, message: "Pitch deleted successfully." };
  } catch (error) {
    console.error("Error deleting pitch:", error);
    return { success: false, message: "Failed to delete pitch." };
  }
}
