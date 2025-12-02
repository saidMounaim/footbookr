import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import prisma from "../prisma";

export async function getAllPitches(type: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("pitches");

  const where = type ? { type: type } : {};

  const pitches = await prisma.pitch.findMany({
    where: where,
    orderBy: {
      name: "asc",
    },
  });

  return pitches;
}

export async function getPitchById(pitchId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`pitch-${pitchId}`);
  const pitch = await prisma.pitch.findUnique({
    where: { id: pitchId },
  });
  return pitch;
}
