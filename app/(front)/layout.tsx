import Header from "@/components/shared/layouts/header";
import Footer from "@/components/shared/layouts/footer";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 mt-30">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
