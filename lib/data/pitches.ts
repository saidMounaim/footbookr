import { cacheLife, cacheTag } from "next/cache";
import "server-only";
import prisma from "../prisma";

export async function getAllPitches() {
  "use cache";
  cacheLife("hours");
  cacheTag("pitches");

  const pitches = await prisma.pitch.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return pitches;
}
