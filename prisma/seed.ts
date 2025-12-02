import { authClient } from "@/lib/auth-client";
import prisma from "@/lib/prisma";

async function main() {
  await authClient.signUp.email(
    {
      email: "admin@footbookr.com",
      password: "admin123",
      name: "admin",
    },
    {
      onSuccess: async () => {
        console.log(`Created user admin`);
        await prisma.user.update({
          where: { email: "admin@footbookr.com" },
          data: { role: "admin" },
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (ctx: any) => {
        console.log(ctx.error);
      },
    }
  );

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
