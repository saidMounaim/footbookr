import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/");

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-zinc-950 py-10">
      <Image
        src="https://placehold.co/1920x1080/022c22/064e3b/png?text=Stadium+Lights"
        alt="Background"
        fill
        className="object-cover opacity-40"
        priority
      />
      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
