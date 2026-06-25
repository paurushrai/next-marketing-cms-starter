import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/** Shared chrome for all public marketing pages. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
