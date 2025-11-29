import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/layouts/header";
import Footer from "@/components/shared/layouts/footer";

import { Toaster } from "sonner";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FootBookr | Elite Pitch Reservation",
  description: "Experience the next generation of sports booking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30"
    >
      <body className={`${font.className} h-full antialiased`}>
        <Header />
        {children}
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
