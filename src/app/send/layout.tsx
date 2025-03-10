export default function SendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative px-4 max-w-[352px] min-h-[852px]">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
