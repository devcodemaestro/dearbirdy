export default function SingupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative w-full max-h-[852px] text-[#292D32]">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
