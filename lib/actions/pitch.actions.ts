"use server";

import { cacheLife, cacheTag } from "next/cache";
import prisma from "../prisma";
import { pitchFormSchema } from "../zodSchemas";
import { z } from "zod";

export async function createPitch(values: z.infer<typeof pitchFormSchema>) {
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

    return { success: true, message: "Pitch created successfully!" };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getPitchById(pitchId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("pitch", pitchId);
  const pitch = await prisma.pitch.findUnique({
    where: { id: pitchId },
  });
  return pitch;
}
