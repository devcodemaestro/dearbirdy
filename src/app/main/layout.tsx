import Background from "@/components/common/Background";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative w-full min-h-[852px]">
        <Background
          src="/images/common/background_main.svg"
          alt="background_main"
          className="absolute inset-0 w-full min-h-[852px] -z-10"
        />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
