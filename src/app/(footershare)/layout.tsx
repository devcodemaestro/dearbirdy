import Limit from "@/components/home/Limit";
import Report from "@/components/home/Report";
import Footer from "@/components/ui/Footer";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const report = false;
  const limit = false;

  return (
    <>
      {report && <Report />}
      {limit && <Limit />}
      <div className="w-[375px] min-h-screen bg-[#f9f8f3] flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
